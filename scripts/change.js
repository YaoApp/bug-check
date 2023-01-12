function OnChange(info) {
  console.log(info);

  let data = { attack: 10 }; // 更新消费金额数据, 消费金额
  data[info["key"]] = info.value;
  let setting = Process("yao.form.Setting", "cphero"); // 根据新数值生成配置信息
  return {
    data: data, // 更新消费金额数据, 消费金额
    setting: setting,
  };
}
function OnChange2(info) {
  console.log(info);

  let data = { defense: 100 }; // 更新消费金额数据, 消费金额
  data[info["key"]] = info.value;
  let setting = Process("yao.form.Setting", "cphero"); // 根据新数值生成配置信息
  return {
    data: data, // 更新消费金额数据, 消费金额
    setting: setting,
  };
}
