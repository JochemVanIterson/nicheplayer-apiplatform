import {
  delCommon,
  resetCommon,
} from "../../../../common/store/delete/actions";
import { ENTRYPOINT } from "../../../../config/1314272676_entrypoint";

export default function (types) {
  const del = (context, item) =>
    delCommon(context, { item, ep: ENTRYPOINT }, { types });
  const reset = (context) => {
    resetCommon(context, { types });
  };

  return { del, reset };
}
