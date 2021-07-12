"use strict";

const globToRegexp = require("./glob-to-regexp");

const pathList = [
  "api",
  "api/",
  "/api",
  "/api/",
  "/api/user",
  "/api/user/",
  "/api/user/id",
  "/api/event/id/",

  "user",
  "user/",
  "/user",
  "/user/",
  "/user/event",
  "/user/event/",
  "/user/event/id",
  "/user/event/id/",

  "event",
  "event/",
  "/event",
  "/event/",
  "/event/user",
  "/event/user/",
  "/event/user/id",
  "/event/user/id/",
];

describe("glob-to-regexp", () => {
  it("empty string", () => {
    const globPattern = "";
    const opts = {globstar: true, ignore: false, flags: "g"};
    const regexpstr = globToRegexp(globPattern, opts);//`^((?!(${nodeInitIgnore.join("|")})).)*$$`;
    console.log("regexpstr:", regexpstr);
    const regexp = new RegExp(regexpstr, opts.flags);
    const res = pathList.filter((e) => regexp.test(e));
    // include all
    expect(res.length).toBe(pathList.length);
    //const regexp = new RegExp(regexpstr);
  });

  it("empty string ignore", () => {
    const globPattern = "";
    const opts = {globstar: true, ignore: true, flags: "g"};
    const regexpstr = globToRegexp(globPattern, opts);//`^((?!(${nodeInitIgnore.join("|")})).)*$$`;
    console.log("regexpstr:", regexpstr);
    const regexp = new RegExp(regexpstr, opts.flags);
    const res = pathList.filter((e) => regexp.test(e));
    // ignore nothing
    expect(res.length).toBe(pathList.length);
    //const regexp = new RegExp(regexpstr);
  });

  it("**/api/**", () => {
    const globPattern = "**/api/**";
    const opts = { flags: "", globstar: false };
    const regexpstr = globToRegexp(globPattern, opts);//`^((?!(${nodeInitIgnore.join("|")})).)*$$`;
    //console.log("regexpstr:", regexpstr);
    const regexp = new RegExp(regexpstr, opts.flags);
    const res = pathList.filter((e) => regexp.test(e));
    //console.log("RES:", res);
    expect(res.length).toBe(5);
    //const regexp = new RegExp(regexpstr);
  });

  it("**/api/** ignore", () => {
    const globPattern = "/api/";
    const opts = { flags: "", globstar: false, ignore: true };
    const regexpstr = globToRegexp(globPattern, opts);//`^((?!(${nodeInitIgnore.join("|")})).)*$$`;
    console.log("regexpstr:", regexpstr);
    const regexp = new RegExp(regexpstr, opts.flags);
    const res = pathList.filter((e) => regexp.test(e));
    console.log("RES:", res);
    expect(res.length).toBe(18);
    //const regexp = new RegExp(regexpstr);
  });

});
