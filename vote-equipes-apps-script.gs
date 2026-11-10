/**
 * Serveur d'enregistrement pour vote-equipes.html
 * ------------------------------------------------
 * À coller dans une feuille Google Sheets : Extensions › Apps Script.
 * Chaque vote ajoute une ligne : Date | Nom | E-mail | une colonne par équipe | Total.
 * Une adresse e-mail ne peut voter qu'une seule fois (vérifié ici, côté serveur).
 *
 * Mise en service : voir la section « Vote des équipes » du README.
 */

var SHEET_NAME = "Votes";
var TOTAL = 100;
var FIXED_COLS = ["Date", "Nom", "E-mail"];

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  if (sh.getLastRow() === 0) {
    sh.appendRow(FIXED_COLS.concat(["Total"]));
    sh.setFrozenRows(1);
  }
  return sh;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function normEmail_(e) {
  return String(e || "").trim().toLowerCase();
}

function hasVoted_(sh, email) {
  var last = sh.getLastRow();
  if (last < 2) return false;
  var col = FIXED_COLS.indexOf("E-mail") + 1;
  var emails = sh.getRange(2, col, last - 1, 1).getValues();
  for (var i = 0; i < emails.length; i++) {
    if (normEmail_(emails[i][0]) === email) return true;
  }
  return false;
}

/** GET ?action=check&email=… → { ok, alreadyVoted } */
function doGet(e) {
  var p = (e && e.parameter) || {};
  if (p.action === "check") {
    var email = normEmail_(p.email);
    return json_({ ok: true, alreadyVoted: hasVoted_(getSheet_(), email) });
  }
  return json_({ ok: true, message: "Serveur de vote opérationnel." });
}

/** POST { action:"vote", nom, email, repartition:{ "Équipe": montant, … } } */
function doPost(e) {
  var data;
  try {
    data = JSON.parse(e.postData.contents);
  } catch (err) {
    return json_({ ok: false, error: "bad_json" });
  }

  var nom = String(data.nom || "").trim().slice(0, 80);
  var email = normEmail_(data.email).slice(0, 120);
  var rep = data.repartition || {};
  if (nom.length < 2) return json_({ ok: false, error: "nom_invalide" });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return json_({ ok: false, error: "email_invalide" });

  var teams = Object.keys(rep);
  var total = 0;
  for (var i = 0; i < teams.length; i++) {
    var v = rep[teams[i]];
    if (typeof v !== "number" || v < 0 || Math.floor(v) !== v) return json_({ ok: false, error: "montant_invalide" });
    total += v;
  }
  if (total !== TOTAL) return json_({ ok: false, error: "total_different_de_" + TOTAL });

  // Verrou : deux envois simultanés de la même adresse ne passent pas tous les deux.
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var sh = getSheet_();
    if (hasVoted_(sh, email)) return json_({ ok: false, error: "already_voted" });

    // Ajoute une colonne pour toute équipe encore inconnue (juste avant « Total »).
    var header = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0];
    teams.forEach(function (t) {
      if (header.indexOf(t) === -1) {
        var totalCol = header.indexOf("Total") + 1;
        sh.insertColumnBefore(totalCol);
        sh.getRange(1, totalCol).setValue(t);
        header = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0];
      }
    });

    var row = header.map(function (h) {
      if (h === "Date") return new Date();
      if (h === "Nom") return /^[=+\-@]/.test(nom) ? "'" + nom : nom; // pas de formule dans la feuille
      if (h === "E-mail") return email;
      if (h === "Total") return total;
      return rep.hasOwnProperty(h) ? rep[h] : 0;
    });
    sh.appendRow(row);
    return json_({ ok: true });
  } finally {
    lock.releaseLock();
  }
}
