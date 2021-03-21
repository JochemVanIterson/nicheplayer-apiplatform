import {
  retrieveCommon,
  resetCommon,
} from "../../../../common/store/show/actions";
import { ENTRYPOINT } from "../../../../config/1314272676_entrypoint";

export default function (types) {
  const retrieve = (context, id) =>
    retrieveCommon(context, { id, ep: ENTRYPOINT }, { types });

  const reset = (context) => {
    resetCommon(context, { types });
  };

  return { retrieve, reset };
}
