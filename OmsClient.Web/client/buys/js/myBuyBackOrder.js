//
$(function () {
    var objTable = {
        tableId: "tableList",
        searchKeys: {},
        searchBarHeight: win.searchBarHeight,
        init: function () {
            var self = this;
            self.initData();
            self.search();
            self.render();
            self.operator();
            self.verify();
        },
        // search初始化
        initData: function () {
            var self = this;
        },
        // 点击搜索
        search: function () {
            var self = this;
            form.on("submit(searchFormFilter)", function (data) {
                $.extend(self.searchKeys, data.field);
                self.render();
                return false;
            });
        },
        // 显示表格
        render: function () {
            var self = this;
            $.tableObject({
                tableId: self.tableId,
                tableOption: {
                    url: "/clientApi/UserBuyOrder/GetBuyOrderListBack",
                    page: true,
                    height: "full-" + self.searchBarHeight,
                    where: self.searchKeys,
                    cols: [
                        [listField.numbers,
                            listField.buyOrderNumber,
                            listField.currencyName,
                            listField.title,
                            listField.supplierName,
                            {
                                field: "CheckDate",
                                title: "驳回时间",
                                width: 110,
                                templet: "<div>{{ d.CheckDate==null?'': d.CheckDate.ToDatetime() }}</div>"
                            },
                            {
                                field: "operator",
                                title: "操作",
                                width: 100,
                                fixed: "right",
                                align: "center",
                                toolbar: "#operator"
                            }
                        ]
                    ]
                }
            });
        },
        // 表格操作
        operator: function () {
            var self = this;
            //监听工具条
            table.on("tool(" + self.tableId + ")", function (obj) {
                //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
                var data = obj.data; //获得当前行数据
                var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
                var tr = obj.tr; //获得当前行 tr 的DOM对象
                if (layEvent === "edit") {
                    win.iframe({
                        title: "编辑订单："+data.BuyOrderNumber,
                        url: 'myBuyOrderDetail.html?buyOrderId='+data.BuyOrderId,
                        done: function () {
                            //
                        },
                        close: function(){
                            self.render();
                        }
                    });
                } else if (layEvent === "del") {
                    //删除
                    win.confirm(
                        "确定删除 [" + obj.data.BuyOrderNumber + "] 吗？",
                        function () {
                            $.postdata("/clientApi/UserBuyOrder/DeleteBuyOrder", obj.data, function (data) {
                                if (data) {
                                    win.msg("删除成功");
                                    self.render();
                                    tabNum();
                                } else {
                                    win.alert("删除失败");
                                }
                            });
                        }
                    );
                }
            });
        },
        verify: function () {
            form.verify({
            });
        }
    };
    objTable.init();
});
