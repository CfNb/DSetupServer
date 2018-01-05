const mongoose = require('mongoose');

const plateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  pfDescription: String
});

// Preflight Data, unique to each incoming file for this item
const preflightSchema = new mongoose.Schema({
  pfFileName: String,
  pfNewFile: Boolean, // preflight is new file received for this item
  date: String,
  
  pfDimensionX: Number,
  pdDimensionY: Number,
  
  pfFontList: [String],
  
  pfLinks: Number,
  pfLinksMissing: Number,
  pfLinksEmbedded: Boolean,
  
  pfInksPMS: [String],
  pfInksCustom: [String],
  pfColorMode: [String],
  
  pfBarcode: String,
  pfBarcodeKind: String,
  pfBarcodeFPO: Boolean,
  
  pfPlates: [plateSchema],
  
  preflightPassedOK: Boolean
});

const itemSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true,
    min: 9999,
    max: 99999
  },
  description: String,
  currnetJob: Number,
  pastJobs: [Number],
  notes: [String],
  
  preflights: [preflightSchema],
  
  setupKind: String,
  
  setupUnwind: Number,
  setupZipperOK: Boolean,
  setupDieline: String,
  setupDimsOK: Boolean,
  setupDieCutOK: Boolean,
  setupMarksCutOK: Boolean,
  setupMarksFoldOK: Boolean,
  setupMarksTearOK: Boolean,
  setupMarksHoleOK: Boolean,
  setupColorOverprintOK: Boolean,
  setupColorSpotsOK: Boolean,
  setupOrangeOK: Boolean,
  setupGreenOK: Boolean,
  setupViolentOK: Boolean,
  setupBlackOK: Boolean,
  setupMetallicsOK: Boolean,
  setupBarcodeOK: Boolean,
  setupPlatesOK: [Boolean], // check box for each plate from preflight?
  setupSpecialInstOK: Boolean,
  setupFinishingOK: Boolean,
  setupCamMarksOK: Boolean,
  setupDieSavedOK: Boolean,
  setupSubstrateOK: Boolean,
  setupPDirectorOK: Boolean,
  setupOutsourcePlatesSavedOK: Boolean,
  setupOursourceCameraMarksOK: Boolean
});

module.exports = mongoose.model('Item', itemSchema);