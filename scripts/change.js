function OnChange(info) {
  let data = { attack: 10 }; // 更新消费金额数据, 消费金额
  data[info["key"]] = info.value;
  let setting = Process("yao.form.Setting", "herocp"); // 根据新数值生成配置信息
  data.attack = 400;
  data.difficulty = 6700;
  data.defense = 6000;

  return {
    data: data, // 更新消费金额数据, 消费金额
    setting: setting,
  };
}
