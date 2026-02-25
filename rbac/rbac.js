import RBAC from "easy-rbac";
import opts from "./policy/index.js";
const rbac = new RBAC(opts);
export default rbac;
