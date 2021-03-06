const os = require("os");

var osIdentity = "";

class Printer {
  constructor(osName, osArch) {
    this.osName = identifyOS(os.platform());
    this.osArch = identifyArch(os.arch());

    if (this.osName === "windows") {
      osIdentity = require("./lib/windows");
    } else if (this.osName === "mac") {
      osIdentity = require("./lib/mac");
    } else if (this.osName === "linux") {
      osIdentity = require("./lib/linux");
    }
  }

  listPrintQueues() {
    if (this.osName !== "un-supported") {
      osIdentity.listPrinters();
    } else {
      console.log("un-supported environment");
    }
  }

  getDefaultPrintQueue() {
    if (this.osName !== "un-supported") {
      osIdentity.getDefaultPrinter();
    } else {
      console.log("un-supported environment");
    }
  }

  setDefaultPrintQueue(printerName) {
    if (this.osName !== "un-supported") {
      osIdentity.setDefaultPrinter(printerName);
    } else {
      console.log("un-supported environment");
    }
  }

  deletePrintQueue(printerName) {
    if (this.osName !== "un-supported") {
      osIdentity.deletePrinter(printerName);
    } else {
      console.log("un-supported environment");
    }
  }

  addPrintQueue(printerOptions) {
    if (this.osName !== "un-supported") {
      osIdentity.addPrinter(printerOptions, this.osArch);
    } else {
      console.log("un-supported environment");
    }
  }
}

function identifyArch(osArch) {
  /*'arm', 'arm64', 'ia32', 'mips', 'mipsel', 'ppc', 'ppc64', 's390', 's390x', 'x32', and 'x64'*/
  return osArch === "x64" ? osArch : osArch === "x32" ? "x86" : "un-supported";
}

function identifyOS(osName) {
  /*'aix', 'darwin', 'freebsd', 'linux', 'openbsd', 'sunos', 'win32'*/
  var value = "un-supported";
  if (osName === "darwin") {
    value = "mac";
  } else if (osName === "win32") {
    value = "windows";
  } else if (
    osName === "aix" ||
    osName === "freebsd" ||
    osName === "linux" ||
    osName === "openbsd" ||
    osName === "sunos"
  ) {
    value = "linux";
  }
  return value;
}

module.exports = Printer;
