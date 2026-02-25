import role from "../../enum/role.js";
import * as adminPolicy from "./adminPolicy.js";
import * as userPolicy from "./userPolicy.js";

const opts = {
  [role.ADMIN]: {
    can: Object.values(adminPolicy),
  },
  [role.USER]: {
    can: Object.values(userPolicy),
  },
};
export default opts;
