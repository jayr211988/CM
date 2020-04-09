export function hasPermission(permission, moduleName) {
  const property = moduleName.split(".");

  if (permission[property[0]]) {
    // TODO
    // tslint:disable-next-line: no-collapsible-if
    if (permission[property[0]][property[1]]) {
      return true;
    }
  }
  return false;
}

export function containPermissions(permissions, moduleName) {
  permissions = permissions[moduleName];
  if (permissions) {
    for (const key in permissions) {
      if (permissions[key] && (key === "list" || permissions[key]) && key === "create") {
        return true;
      }
    }
  }
  return false;
}
