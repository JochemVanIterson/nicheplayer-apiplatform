import {
  createCommon,
  resetCommon,
} from "../../../../common/store/create/actions";
import { ENTRYPOINT } from "../../../../config/1314272676_entrypoint";

const page = "media_objects";

export default function (types) {
  const create = (context, values) =>
    createCommon(context, { page, values, ep: ENTRYPOINT }, { types });

  const reset = (context) => resetCommon(context, { types });

  return { create, reset };
}
