/**
 * @author: WhiteWallTeam
 * @date: 2025.10.13
 * @description: RPC 类型序列化与反序列化
 */

//----------------------------------------------------
// 🔧 工具函数
//----------------------------------------------------
function isNumeric(value) {
  if (value === null || value === "") return false;
  const num = Number(value);
  return !Number.isNaN(num);
}

function isInteger(value) {
  const num = Number(value);
  return Number.isInteger(num);
}

function isFloat(value) {
  const num = Number(value);
  return !Number.isNaN(num) && !Number.isInteger(num);
}

//----------------------------------------------------
// 🧱 类型化序列化：JS 对象 → 带类型 JSON
//----------------------------------------------------
export function toTypedJson(value) {
  if (value === null) return { type: "nil" };

  const t = typeof value;

  switch (t) {
    case "boolean":
      return { type: "boolean", value };

    case "number":
      return {
        type: Number.isInteger(value) ? "uint" : "double",
        value,
      };

    case "string":
      return { type: "binary", value };

    case "object":
      if (Array.isArray(value)) {
        return {
          type: "array",
          value: value.map(toTypedJson),
        };
      }

      // 普通对象
      return {
        type: "object",
        value: Object.entries(value).map(([k, v]) => {
          // 尝试恢复数字键
          if (isInteger(k)) k = parseInt(k);
          else if (isFloat(k)) k = parseFloat(k);
          return {
            key: toTypedJson(k),
            value: toTypedJson(v),
          };
        }),
      };

    default:
      throw new TypeError(`Unsupported type: ${t}`);
  }
}

//----------------------------------------------------
// 🔄 反序列化：类型化 JSON → JS 对象
//----------------------------------------------------
export function fromTypedJson(node) {
  if (!node || typeof node !== "object" || !("type" in node)) return node;

  const decoders = {
    array: (v) => v.map(fromTypedJson),

    object: (v) => {
      const obj = {};
      for (const { key, value } of v) {
        let k = fromTypedJson(key);
        // 如果 key 是数字类型，还原为字符串
        if (isNumeric(k)) k = k.toString();
        obj[k] = fromTypedJson(value);
      }
      return obj;
    },

    string: (v) => v,
    binary: (v) => v,
    uint: (v) => v,
    int: (v) => v,
    float: (v) => v,
    double: (v) => v,
    boolean: (v) => !!v,
    nil: () => null,
  };

  const decode = decoders[node.type];
  return decode ? decode(node.value) : node.value;
}

