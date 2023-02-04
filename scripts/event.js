function OnChange(info) {
  let data = { attack: 10 }; // 更新消费金额数据, 消费金额
  let setting = Process("yao.form.Setting", "hero"); // 根据新数值生成配置信息

  setting["name"] = "Test";
  setting["fields"]["form"]["位置"]["edit"]["props"]["options"] = [
    {
      label: "上单",
      value: "上单",
    },
    {
      label: "中单",
      value: "中单",
    },
    {
      label: "打野",
      value: "打野",
    },
  ];

  return {
    data,
    setting,
  };
}

function AfterFind(payload) {
  var arr = [
    {
      id: "_8sFX5IN-bg98ZzEqFMOp91675490468028",
      price: 100,
      number: 200,
      type: "a",
    },
    {
      id: "_8sFX5IN-bg98ZzEqFMOp91675490468038",
      price: 300,
      number: 400,
      type: "b",
    },
  ];
  payload.json_1 = arr;

  payload.json_2 = [
    {
      id: 1,
      price: 100,
      number: 200,
      type: "a",
    },
    {
      id: 2,
      price: 300,
      number: 400,
      type: "b",
    },
  ];
  return payload;
}
