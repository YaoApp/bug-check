/**
 * Debug
 * @param {*} query
 */
function OnChange(query) {
  console.log(query);
  query = query || {};
  field = query.key; // 字段名称
  newVal = query.value; // 新数值
  // oldVal = query.old; // 原始值
  // extra = query.extra; // 开发者定义数据

  let data = { cost: newVal * 100, query: query }; // 更新消费金额数据, 消费金额

  data[field] = newVal;
  // 这里通过下面的方法来获取setting
  let setting = Process("yao.form.Setting", "pet"); // 根据新数值生成配置信息;

  // 错误检测
  if (setting && setting.code && setting.message) {
    console.log(setting);
    throw new Exception(setting.message, 500);
  }
  console.log(setting);

  return {
    data: data, // 更新消费金额数据, 消费金额
    setting: setting,
  };
}

function OnChange2(query) {
  console.log(query);
  query = query || {};
  field = query.key; // 字段名称
  newVal = query.value; // 新数值
  // oldVal = query.old; // 原始值
  // extra = query.extra; // 开发者定义数据

  let data = { cost2: 1000 * newVal, query: query }; // 更新消费金额数据, 消费金额
  data[field] = newVal;
  // 这里通过下面的方法来获取setting
  let setting = Process("yao.form.Setting", "pet"); // 根据新数值生成配置信息;

  // 错误检测
  if (setting && setting.code && setting.message) {
    console.log(setting);
    throw new Exception(setting.message, 500);
  }
  console.log(setting);

  return {
    data: data, // 更新消费金额数据, 消费金额
    setting: setting,
  };
}

function GteSetting() {
  var setting = {
    actions: [
      {
        action: [
          {
            name: "Delete",
            payload: {
              pathname: "/x/Table/env",
            },
            type: "Form.delete",
          },
        ],
        confirm: {
          desc: "确认删除，删除后数据无法恢复？",
          title: "提示",
        },
        icon: "icon-trash-2",
        id: "b57eff5c9bac87d74e2a26596ed2b76f",
        style: "danger",
        title: "删除",
      },
      {
        action: [
          {
            name: "Save",
            payload: {
              id: ":id",
              status: "cured",
            },
            type: "Form.save",
          },
        ],
        confirm: {
          desc: "确认变更为治愈状态？{{name}}",
          title: "提示",
        },
        icon: "icon-check",
        id: "2f603fca9dae7599897db0e978b4ec77",
        style: "success",
        title: "治愈 {{name}}",
      },
      {
        action: [
          {
            name: "Foo",
            payload: {
              args: ["{{id}}", "{{name}}"],
              method: "Bar",
            },
            type: "Service.foo",
          },
        ],
        icon: "icon-cloud",
        id: "05c03c4436ab32ac022bf8e1534ccbc4",
        title: "测试云函数",
      },
      {
        action: [
          {
            name: "Hello",
            payload: {
              args: ["{{id}}", "{{name}}"],
              method: "World",
            },
            type: "Studio.hello",
          },
        ],
        icon: "icon-layers",
        id: "3455983d773746047e34bfc1f9800f04",
        title: "测试Studio",
      },
    ],
    config: {
      full: true,
    },
    fields: {
      form: {
        List测试: {
          bind: "test_array",
          edit: {
            props: {
              name: "test",
              showLabel: false,
            },
            type: "List",
          },
          id: "9868ca52fa15923ede2c777ad11803d2",
        },
        住院天数: {
          bind: "stay",
          edit: {
            props: {},
            type: "Input",
          },
          id: "22071fa581e7dcfae363e209096c2526",
        },
        消费金额: {
          bind: "cost",
          edit: {
            props: {},
            type: "InputNumber",
          },
          id: "d6f31e86ea9ec73082d10ea3488458f5",
        },
      },
    },
    form: {
      sections: [
        {
          columns: [
            {
              name: "住院天数",
              width: 8,
            },
            {
              name: "消费金额",
              width: 8,
            },
            {
              name: "List测试",
              width: 24,
            },
          ],
          desc: "更为详细的宠物信息",
          title: "更多资料",
        },
      ],
    },
    hooks: {
      onChange: {
        住院天数: {
          api: "/api/__yao/form/pet/component/fields.form.%E4%BD%8F%E9%99%A2%E5%A4%A9%E6%95%B0.edit.props/on%3Achange",
          params: {},
        },
      },
    },
    name: "Pet Admin",
    primary: "id",
  };
  return setting;
}

/**
 * Debug
 * @param {*} query
 */
function OnChangeList(query) {
  query = query || {};
  field = query.field; // 字段名称
  newVal = query.value; // 新数值
  oldVal = query.old; // 原始值
  extra = query.extra; // 开发者定义数据

  let data = { stock: 1000, query: query }; // 更新消费金额数据, 消费金额
  let setting = Process("yao.form.Setting", "pet", data); // 根据新数值生成配置信息;

  // 错误检测
  if (setting && setting.code && setting.message) {
    throw new Exception(setting.message, 500);
  }

  return {
    data: data, // 更新消费金额数据, 消费金额
    setting: setting,
  };
}
