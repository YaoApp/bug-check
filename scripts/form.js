function Save(payload) {
  if (!payload.name) {
    throw new Exception("模板名称不能为空!", 400);
  }
  if (!payload.content) {
    throw new Exception("模板内容不能为空!", 400);
  }

  var data = payload["content"]["data"] || [];
  var index_arr = ["Input", "Radio", "Checkbox", "TextArea"];
  for (let i in data) {
    var item = data[i] || [];
    for (let j in item) {
      if (index_arr.indexOf(item[j]["type"]) != -1) {
        if (!item[j]["field_name"]) {
          item[j]["field_name"] =
            Process("scripts.common.randomString", 8) +
            item[j]["type"].toLowerCase();
        } else {
          item[j]["field_name"] = item[j]["field_name"].toLowerCase();
        }
      }
    }
    data[i] = item;
  }
  payload["content"]["data"] = data;

  //var content = JSON.parse(payload.content);

  // 保存审批流
  const id = Process("models.work.form.save", payload);
  if (payload.approval_content) {
    const exis = Process("models.work.approval_flow.get", {
      wheres: [{ column: "form_id", value: id, op: "=" }],
      limit: 1,
    });
    var insert = {
      form_id: id,
      content: payload.approval_content,
    };

    if (exis && exis.length) {
      insert["id"] = exis[0]["id"];
    }

    Process("models.work.approval_flow.save", insert);
  }
  return id;
}

/**
 * yao run scripts.hooks.form.FindElement
 * @param {*} array
 */
function FindElement(array) {
  var array = [
    {
      api: "",
      text: "项目附件",
      type: "api",
    },
    {
      api: "",
      text: "打印",
      type: "api",
    },
    {
      api: "",
      text: "帮助",
      type: "api",
    },
  ];
  for (let i in array) {
    if (array[i]["text"].indexOf("附件") != -1) {
      return i;
    }
  }
  return -1;
}
// 获取随机字段
function GetRandomField() {
  // 获取随机5-8位字符串
}

function AfterFind(payload) {
  const exis = Process("models.work.approval_flow.get", {
    wheres: [{ column: "form_id", value: payload.id, op: "=" }],
    limit: 1,
  });
  if (exis && exis.length) {
    payload.approval_content = exis[0]["content"];
  }
  return payload;
}

function ModelDsl(content) {
  var data = content.data || [];
  var model_dsl = {
    name: "",
    table: {
      name: "",
      comment: "",
    },
    columns: [
      {
        label: "ID",
        name: "id",
        type: "ID",
        comment: "ID",
        primary: true,
      },
      {
        label: "项目id",
        name: "project_id",
        type: "integer",
        comment: "项目id",
        nullable: true,
      },
      {
        label: "审核状态",
        name: "audit_status",
        type: "string",
        comment: "审核状态:待审核,已通过,已驳回",
        nullable: true,
      },
      {
        label: "当前审核人",
        name: "audit_by",
        type: "integer",
        nullable: true,
        comment: "当前审核人",
      },
      {
        label: "审核不通过原因",
        name: "reason",
        type: "string",
        comment: "审核不通过原因",
        nullable: true,
      },
    ],
    relations: {},
    indexes: [],
    option: {
      timestamps: true,
      soft_deletes: true,
    },
    values: [],
  };

  var index_arr = ["Input", "Radio", "Checkbox"];
  for (let i in data) {
    var item = data[i] || [];
    for (let j in item) {
      if (index_arr.indexOf(item[j]["type"]) != -1) {
        var insert = {
          label: "",
          name: "",
          type: "",
          comment: "",
          nullable: true,
        };
        if (item[j]["type"] == "Input" || item["tyoe"] == "Radio") {
          insert.type = "string";
        } else {
          insert.type = "json";
        }
        insert.name = "_index" + i + "_index" + j + "_index" + item[j]["type"];
        insert.label = item[j]["label"] || "";
        insert.comment = insert.label;
        model_dsl["columns"].push(insert);
      }
    }
  }
  return model_dsl;

  // var form = content["fields"]["form"] || {};
  // var model_dsl = { columns: [] };
  // for (var i in form) {
  //   var type = form[i]["edit"]["type"];
  //   model_dsl["columns"].push({
  //     label: i,
  //     name: i,
  //     comment: i,
  //     nullable: true,
  //     type: Mapping(type),
  //     title: i,
  //   });
  // }
  // return model_dsl;
}

function Mapping(type) {
  const mapping = {
    Input: "string",
    TextArea: "string",
    DatePicker: "datetime",
    Select: "string",
    RadioGroup: "string",
    CheckboxGroup: "json",
    Upload: "json",
  };
  if (mapping[type]) {
    return mapping[type];
  }
  return "string";
}

function ChildAfterFind(payload) {
  const node = Process("models.work.project_flow.get", {
    wheres: [{ column: "project_id", value: payload.id, op: "=" }],
  });
  if (!node || !node.length) {
    return {
      id: payload.id,
      ids: [0],
    };
  } else {
    var data = node[0]["content"];

    const pathnameArray = data.map((item) =>
      item.items
        .filter((i) => i.hasOwnProperty("pathname") && i.pathname != "")
        .map((i) => i.pathname)
    );
    let flatArr = pathnameArray.flat();
    node[0]["ids"] = flatArr;
  }
  return node[0];
}

/**
 * yao run scripts.hooks.form.Test
 */
function Test() {
  var data = [
    {
      id: "wYGLiWGjs6a-6Nc8DucOI",
      items: [
        { id: "Ci2vuxdmllnj7e5fTf6mC", title: "方案提资" },
        { id: "sOqxg-vTeO_i83SJBAyTw", title: "启动会议", pathname: "1" },
        { id: "vw9kvTNqE2k9hK6qVf3CQ", title: "提资存档", pathname: "2" },
        { id: "XCsIrorJGCnsYrDRcQw8d", title: "项目计划", pathname: "3" },
      ],
      title: "扩初",
    },
    {
      id: "MuBv6XgLVcCW7HSe8rXF0",
      items: [
        { id: "sCBCK1nyevG9K6Ca3BlMT", title: "任务甘特图" },
        { id: "98tp7apBZC7L9N7wTMeJ0", title: "图纸绘制", pathname: "6" },
        { id: "afoAJx0yMrI-njvcVhvFO", title: "内审校对", pathname: "7" },
        { id: "dy5s2Mft8xL-NsoLN_mDr", title: "图纸审核", pathname: "8" },
        { id: "61ul5WUSUFrRX9qd23itx", title: "项目出图", pathname: "" },
        { id: "DTqZdoeDk0nace-vJWfl4", title: "专业提资", pathname: "9" },
        { id: "fURZeWX7Zv6T4PW-1wYKA", title: "专业配合", pathname: "" },
        { id: "zBQAQxkszhz0nXPq52fa7", title: "专业成图", pathname: "" },
      ],
      title: "施工图",
    },
    {
      id: "7eIN9SaWrQg_ksQ2p5t67",
      items: [
        { id: "S1tp3_F1W8hYfV0E3aCeB", title: "施工服务" },
        { id: "sA2P3ZcTxATRdIFFMcR0p", title: "技术交底", pathname: "" },
        { id: "Iq9pUH_icqOwSHXBK8UZl", title: "现场服务", pathname: "" },
        { id: "thotXklFjoAW9cCrDk5on", title: "评估验收", pathname: "" },
        { id: "ygWxdL278z0jPJa79N6xy", title: "总结归档", pathname: "" },
      ],
      title: "施工",
    },
    {
      id: "M5BWlxAJrIYzVChurAE05",
      items: [
        { id: "mGtQT1q567lV-kbAVtXFA", title: "归档" },
        { id: "isRQ6aOtT9dMo1t7BOMel", title: "经验总结", pathname: "" },
        { id: "yTKDl8SB0ym5StF_dj4fz", title: "现场拍摄", pathname: "" },
        { id: "CL_-02EYAYFjNP8v__vnl", title: "分享会", pathname: "" },
      ],
      title: "结项",
    },
  ];

  const pathnameArray = data.map((item) =>
    item.items
      .filter((i) => i.hasOwnProperty("pathname") && i.pathname != "")
      .map((i) => i.pathname)
  );
  let flatArr = pathnameArray.flat();
  console.log(flatArr);
}
