export function createObject(packageName, payload) {
  var splitted = packageName.split('.'),
    result = {},
    temp = result,
    i;

  for (i = 0; i < splitted.length - 1; i++) {
    temp[splitted[i]] = temp[splitted[i]] || {};
    temp = temp[splitted[i]];
  }

  temp[splitted[i]] = payload;

  return result
}

export const nestDeep = (o, to) => {
  // exit condition for recursion
  if (typeof to !== 'object') return o;
  // let's check every key in object we want to put in
  for (let k in o) {
    // if we already have this key and what we want to put in is object - recurse
    if (to.hasOwnProperty(k) && typeof o[k] === 'object') {
      nestDeep(o[k], to[k])
    } else {
      // else, just put whatever in
      to[k] = o[k];
    }
  }
  // return result
  return to;
}

export function createFile(name, contents, mime_type) {
  mime_type = mime_type || "text/plain";

  var blob = new Blob([contents], {type: mime_type});

  var dlink = document.createElement('a');
  dlink.download = name;
  dlink.href = window.URL.createObjectURL(blob);
  dlink.onclick = function(e) {
    // revokeObjectURL needs a delay to work properly
    var that = this;
    setTimeout(function() {
      window.URL.revokeObjectURL(that.href);
    }, 1500);
  };

  dlink.click();
  dlink.remove();
}

export function nestedObjectToArray(obj) {
  if (typeof (obj) !== "object") {
    return [obj];
  }
  var result = [];
  if (obj.constructor === Array) {
    obj.map(function (item) {
      console.log(item)
      result = result.concat(nestedObjectToArray(item));
    });
  } else {
    Object.keys(obj).map(function (key) {
      if (obj[key] && typeof obj[key] === 'object') {
        var chunk = nestedObjectToArray(obj[key]);
        chunk.map(function (item) {
          result.push(key + "." + item);
        });
      } else {
        result.push(key);
      }
    });
  }
  return result;
}
