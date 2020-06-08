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
                    url: "/clientApi/UserStockIn/GetStockInList",
                    page: true,
                    height: "full-" + self.searchBarHeight,
                    where: self.searchKeys,
                    cols: [
                        [
                            {
                                field: "Number",
                                title: "采购单号",
                                width: 90,
                            },
                            {
                                field: "UserName",
                                title: "采购员",
                                width: 80,
                            },
                            {
                                field: "Sku",
                                title: "编码",
                                width: 80,
                            },
                            {
                                field: "Name",
                                title: "名称",
                            },
                            {
                                field: "Specification",
                                title: "规格",
                            },
                            {
                                field: "Description",
                                title: "描述",
                            },
                            listField.imageQty,
                            {
                                field: "Price",
                                title: "价格",
                                width: 70,
                                templet: "<div>￥{{ d.Price }}</div>",
                            },
                            {
                                field: "Qty",
                                title: "数量",
                                width: 60,
                            },
                            {
                                field: "Remark",
                                title: "采购备注",
                            },
                            {
                                field: "InStockRemark",
                                title: "入库备注",
                            },
                            {
                                field: "CreateDate",
                                title: "入库时间",
                                width: 110,
                                templet: "<div>{{ d.CreateDate==null?'': d.CreateDate.ToDatetime() }}</div>"
                            },
                        ]
                    ]
                }
            });
        },
    };
    objTable.init();
});
