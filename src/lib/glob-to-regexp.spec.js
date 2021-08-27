"use strict";

const globToRegexp = require("./glob-to-regexp");


describe("glob-to-regexp", () => {
  it("empty string", () => {
    const globPattern = "";
    const opts = {ignore: false};

    let restr = globToRegexp(globPattern, opts);//`^((?!(${nodeInitIgnore.join("|")})).)*$$`;
    expect(restr).toBe("");
    // ignore
    opts.ignore = true;
    restr = globToRegexp(globPattern, opts);//`^((?!(${nodeInitIgnore.join("|")})).)*$$`;
    expect(restr).toBe("");
  });

  it("'*'", () => {
    const globPattern = "*";
    const opts = {ignore: false};

    let restr = globToRegexp(globPattern, opts);//`^((?!(${nodeInitIgnore.join("|")})).)*$$`;
    expect(restr).toBe(".*");

  });
});

describe("* ** match", () => {

  const pathList = [
    "api",
    "api/",
    "/api",
    "/api/",
    "/api/.api",
    "/api/user",
    "/api/user/",
    "/api/user/id",
    "/api/event/id/",
  
    "user",
    "user/",
    "/user",
    "/user/",
    "/user/.user",
    "/user/event",
    "/user/event/",
    "/user/event/id",
    "/user/event/id/",
  
    "event",
    "event/",
    "/event",
    "/event/",
    "/event/.event",
    "/event/user",
    "/event/user/",
    "/event/user/id",
    "/event/user/id/",
  ];
  
  it("empty string", () => {
    const globPattern = "";
    const opts = {ignore: false};
    const regexpstr = globToRegexp(globPattern, opts);//`^((?!(${nodeInitIgnore.join("|")})).)*$$`;

    const regexp = new RegExp(regexpstr, opts.flags);
    const res = pathList.filter((e) => regexp.test(e));
    // include all
    expect(res.length).toBe(pathList.length);
    //const regexp = new RegExp(regexpstr);
  });

  it("empty string ignore", () => {
    const globPattern = "";
    const opts = {ignore: true};
    const regexpstr = globToRegexp(globPattern, opts);//`^((?!(${nodeInitIgnore.join("|")})).)*$$`;

    const regexp = new RegExp(regexpstr, opts.flags);
    const res = pathList.filter((e) => regexp.test(e));
    // ignore nothing
    expect(res.length).toBe(pathList.length);
    //const regexp = new RegExp(regexpstr);
  });

  it("'*'", () => {
    const globPattern = "*";
    const opts = {ignore: false};
    const regexpstr = globToRegexp(globPattern, opts);//`^((?!(${nodeInitIgnore.join("|")})).)*$$`;
    console.log("regexpstr:",globPattern, regexpstr);

    const regexp = new RegExp(regexpstr, opts.flags);
    const res = pathList.filter((e) => regexp.test(e));
    // include all
    expect(res.length).toBe(pathList.length);
    //const regexp = new RegExp(regexpstr);
  });

  it("'*' ignore", () => {
    const globPattern = "*";
    const opts = {ignore: true};
    const regexpstr = globToRegexp(globPattern, opts);//`^((?!(${nodeInitIgnore.join("|")})).)*$$`;
    console.log("regexpstr:",globPattern, regexpstr);

    const regexp = new RegExp(regexpstr, opts.flags);
    const res = pathList.filter((e) => regexp.test(e));
    // exclude all
    expect(res.length).toBe(0);
    //const regexp = new RegExp(regexpstr);
  });

  it("**/api/**", () => {
    const globPattern = "**/api/**";
    const opts = {};
    const regexpstr = globToRegexp(globPattern, opts);//`^((?!(${nodeInitIgnore.join("|")})).)*$$`;
    console.log("regexpstr:",globPattern, regexpstr);

    const regexp = new RegExp(regexpstr, opts.flags);
    const res = pathList.filter((e) => regexp.test(e));
    //console.log("RES:", res);
    expect(res.length).toBe(6);
    //const regexp = new RegExp(regexpstr);
  });

  it("**/api/** ignore", () => {
    const globPattern = "**/api/**";
    const opts = { ignore: true };
    const regexpstr = globToRegexp(globPattern, opts);//`^((?!(${nodeInitIgnore.join("|")})).)*$$`;
    console.log("regexpstr:",globPattern, regexpstr);

    const regexp = new RegExp(regexpstr, opts.flags);
    const res = pathList.filter((e) => regexp.test(e));
    //console.log("RES:", res);
    expect(res.length).toBe(21);
    //const regexp = new RegExp(regexpstr);
  });

  it("[**/api/**, **/user/**]", () => {
    const globPattern = ["**/api/**", "**/user/**"];
    const opts = {};
    const regexpstr = globToRegexp(globPattern, opts);//`^((?!(${nodeInitIgnore.join("|")})).)*$$`;

    const regexp = new RegExp(regexpstr, opts.flags);
    const res = pathList.filter((e) => regexp.test(e));

    console.log("regexpstr:",globPattern, regexpstr, res);
    expect(res.length).toBe(15);
    //const regexp = new RegExp(regexpstr);
  });

  it("[**/api/**, **/user/**] ignore", () => {
    const globPattern = ["**/api/**", "**/user/**"];
    const opts = { ignore: true };
    const regexpstr = globToRegexp(globPattern, opts);//`^((?!(${nodeInitIgnore.join("|")})).)*$$`;

    const regexp = new RegExp(regexpstr, opts.flags);
    const res = pathList.filter((e) => regexp.test(e));

    console.log("ignore regexpstr:",globPattern, regexpstr, res);
    expect(res.length).toBe(12);
    //const regexp = new RegExp(regexpstr);
  });
});

describe("hidden files match", () => {
  it("hidden files", () => {
    const re = new RegExp(globToRegexp(
      ".*",
      {}
    ));

    const res = ["a", "a.b", ".a", ".a.b"].filter((e) => re.test(e));
    console.log(">>>>>>>>>", res);
    expect(res.length).toBe(3);
    expect(res.indexOf("a")).toBe(-1);
  });

  it("hidden directories", () => {
    const re = new RegExp(globToRegexp(
      ".**",
      {}
    ));

    const res = ["a/b", "a/b.c", "a/.b", "a/.b.c"].filter((e) => re.test(e));
    console.log(">>>>>>>>>", res);
    expect(res.length).toBe(3);
    expect(res.indexOf("a/b")).toBe(-1);
  });
});
