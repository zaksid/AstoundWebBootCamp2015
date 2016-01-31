var module = function () {
    var moduleList = [];
    return {
        addModule: function (moduleName, module) {
            moduleList[moduleName] = module;
        },
        use: function (moduleName, arguments) {
            moduleList[moduleName].init(arguments);
            return moduleList[moduleName];
        }
    }
}();