var rowIndex=0;
var tabTitleStr,tabIndex;

//当flagIndex的值分别为：1是班级管理,2是学生管理,3是教师管理
function addPanel(titleStr,flagIndex){
    tabTitleStr=titleStr;
    tabIndex=flagIndex;
    var tab=$("#tabContent").tabs("getTab",titleStr);
    if(tab){
        $("#tabContent").tabs("select",titleStr);
        if(flagIndex!=2){
            clearAllRowStatus();
        }
        return ;
    }

    var cols,columns,url,tit,content;
    var content1,cols1,columns1,tit1,url1,content2;
    if(flagIndex==1){   //班级管理
        url="./data/datagrid_data1.json";
        tit=titleStr+"--通过右键菜单操作";
        cols=[
            '{"field":"","checkbox":true,"align":"center"},',
            '{"field":"name","title":"名称","width":"200","align":"center"},',
            '{"field":"classes","title":"年级","width":"200","align":"center"},',
            '{"field":"headteacher","title":"班主任","width":"200","align":"center"},',
            '{"field":"teacher","title":"任课老师","width":"270","align":"center"},',
            '{"field":"number","title":"人数","width":"170","align":"center"}'
        ];
        columns= createColumnsHead(cols);
    }else if(flagIndex==2){    //学生管理
        url="./data/datagrid_data2.json";
        tit="班级列表";
        cols=[
            '{"field":"","checkbox":true,"align":"center"},',
            '{"field":"name","title":"名称","width":"120","align":"center"},',
            '{"field":"class","title":"年级","width":"130","align":"center"}'
        ];
        columns= createColumnsHead(cols);
        url1="./data/datagrid_data20.json";
        tit1="学生列表";
        cols1=[
            '{"field":"","checkbox":true,"align":"center"},',
            '{"field":"id","title":"学号","width":"120","align":"center"},',
            '{"field":"name","title":"名称","width":"100","align":"center"},',
            '{"field":"sex","title":"性别","width":"80","align":"center"},',
            '{"field":"yuanxi","title":"院系","width":"190","align":"center"},',
            '{"field":"zhuanye","title":"专业","width":"100","align":"center"},',
            '{"field":"phone","title":"联系电话","width":"100","align":"center"},',
            '{"field":"email","title":"邮箱","width":"180","align":"center"}'
        ];
        columns1=createColumnsHead(cols1);
    }else if(flagIndex==3){     //教师管理
        url="./data/datagrid_data3.json";
        tit=titleStr+"--通过右键菜单操作";
        cols=[
            '{"field":"","checkbox":true,"align":"center"},',
            '{"field":"name","title":"姓名","width":"200","align":"center"},',
            '{"field":"old","title":"年龄","width":"120","align":"center"},',
            '{"field":"year","title":"入职时间","width":"180","align":"center"},',
            '{"field":"sex","title":"性别","width":"120","align":"center"},',
            '{"field":"states","title":"婚姻状况","width":"200","align":"center"},',
            '{"field":"addr","title":"家庭住址","width":"240","align":"center"}'
        ];
        columns= createColumnsHead(cols);
    }
    if(flagIndex!=2){
        content = "<table style=\"margin:10px\" class=\"easyui-datagrid\" id='tabGrid" + tabIndex + "'"
            + "data-options='url:\""+ url +"\",method:\"get\","
            + "checked:true,title:\""+tit+"\","
            +  columns
            + "loadMsg:\"数据加载中, 请稍等......\","
            + "fit:true,singleSelect:true,rownumbers:true,canche:false,"
            + "pagination:true,pagePosition:\"bottom\","
            + "onLoadSuccess:setPage,"
            + "'></table>";
        $("#tabContent").tabs("add",{
            title: titleStr,
            border:false,
            content:content,
            closable: true
        });
        if(flagIndex == 1){	// 解决切换不同tab时显示的右键菜单相同的问题
            $("#tabGrid" + tabIndex).datagrid({
                onRowContextMenu:classContextMenu
            });
        }else if(flagIndex == 3){
            $("#tabGrid" + tabIndex).datagrid({
                onRowContextMenu:teacherContextMenu
            });
        }
    }else{
        content = "<table style=\"margin:10px\" class=\"easyui-datagrid\" id='tabGrid" + tabIndex + "'"
            + "data-options='url:\""+ url +"\",method:\"get\","
            + "checked:true,"
            +  columns
            + "loadMsg:\"数据加载中, 请稍等......\","
            + "fit:true,singleSelect:true,rownumbers:true,canche:false,"
            + "pagination:true,pagePosition:\"bottom\","
            + "onLoadSuccess:setPage,"
            + "'></table>";
        content1 = "<table style=\"margin:10px\" class=\"easyui-datagrid\" id='tabGrid2" + rowIndex + "'"
            + "data-options='url:\""+ url1 +"\",method:\"get\","
            + "checked:true,toolbar:\"#tabToolBar\","
            +  columns1
            + "loadMsg:\"数据加载中, 请稍等......\","
            + "fit:true,singleSelect:true,rownumbers:true,canche:false,"
            + "pagination:true,pagePosition:\"bottom\","
            + "onLoadSuccess:setPage1,"
            + "'></table>";
            //content2="<div id=\"layoutTab\" class=\"easyui-layout\" data-options=\"fit:true\"></div>";
        content2="<div id=\"layoutTab\" class=\"easyui-layout\" data-options=\"fit:true\">"
            +"<div id=\"west\" data-options='region:\"west\",title:\"班级列表\",split:true,border:false' style='width:310px;'>"+content+"</div>"
            +"<div id=\"center\" data-options='region:\"center\",title:\"学生列表\",border:false'>"+content1+"</div>"
            +"</div>";
        $("#tabContent").tabs("add",{
                title: titleStr,
                border:false,
                content:content2,
                closable: true
        });
        $("#tabGrid" + tabIndex).datagrid({
            onSelect:function(index){
                if(index>=3){
                    $.messager.alert("班级列表","该班还尚未开班");
                }else{
                    //rowIndex=index;
                    $("#tabGrid2" + rowIndex).datagrid({
                        url:"./data/datagrid_data2"+index+".json"
                    });
                }
            }
        });
    }
}

//刷新行
function refre(){
    $("#tabGrid2"+rowIndex).datagrid("reload");
}

//添加行
function addRow(){
    $('#tabGrid2'+rowIndex).datagrid('insertRow',{
        index: 0,	// 索引从0开始
        row: {
            id:"学号",        //input框的name：想要添加的行内容；
            name:"新内容",
            sex:"男",
            yuanxi:"所在院系",
            zhuanye:"所在专业",
            phone:"13455666XXX",
            email:"13455666XXX@qq.com"
        }
    });
}

//删除行
function delRow(){
    $("#tabGrid2"+rowIndex).datagrid("deleteRow",0);
}
//编辑行
function editRow(){
    //$("#tabGrid2"+rowIndex).datagrid("beginEdit",0);
    $.messager.alert("添加","添加失败,你还没有操作权限","info");
}

//添加class右键菜单
function classContextMenu(e,index,row){
    tabIndex=1;
    clearAllRowStatus();
    $("#tabGrid"+tabIndex).datagrid("selectRow",index);
    if(index==null || index==-1){
        return;
    }
    $("#classMenu").empty();
    $("#classMenu").menu("appendItem",{
        id:"info1",
        iconCls:"icon-search",
        text:"查看详情",
        onclick:function(){
            editClass(tabIndex,index,row,"查看详情",0);
        }
    });
    $("#classMenu").menu("appendItem",{
        id:"edit1",
        iconCls:"icon-edit",
        text:"编辑班级",
        onclick:function(){
            editClass(tabIndex,index,row,"编辑班级",1);
        }
    });
    $("#classMenu").menu("appendItem",{
        id:"remove1",
        iconCls:"icon-remove",
        text:"删除班级",
        onclick:function(){
            removeClass(index,row,"删除班级",2)
        }
    });
    $("#classMenu").menu("appendItem",{
        id:"add1",
        iconCls:"icon-add",
        text:"添加班级",
        onclick:function(){
            editClass(tabIndex,index,row,"添加班级",3);
        }
    });
    $("#classMenu").menu("show",{
        left: e.pageX,
        top: e.pageY
    });
    e.preventDefault();
}

//添加教师右键菜单
function teacherContextMenu(e,index,row){
    tabIndex=3;
    clearAllRowStatus();
    $("#tabGrid"+tabIndex).datagrid("selectRow",index);
    if(index==null || index==-1){
        return;
    }
    $("#teacherMenu").empty();
    $("#teacherMenu").menu("appendItem",{
        id:"info3",
        iconCls:"icon-search",
        text:"查看详情",
        onclick:function(){
            editClass(tabIndex,index,row,"查看详情",0);
        }
    });
    $("#teacherMenu").menu("appendItem",{
        id:"edit3",
        iconCls:"icon-edit",
        text:"编辑教师",
        onclick:function(){
            editClass(tabIndex,index,row,"编辑教师",1);
        }
    });
    $("#teacherMenu").menu("appendItem",{
        id:"remove3",
        iconCls:"icon-remove",
        text:"删除教师",
        onclick:function(){
            removeClass(index,row,"删除教师",2);
        }
    });
    $("#teacherMenu").menu("appendItem",{
        id:"add3",
        iconCls:"icon-add",
        text:"添加教师",
        onclick:function(){
            editClass(tabIndex,index,row,"添加教师",3);
        }
    });
    $("#teacherMenu").menu("show",{
        left: e.pageX,
        top: e.pageY
    });
    e.preventDefault();
}

//创建columns
function createColumnsHead(cols){
    var colsHead = "columns:[["
    for(var index in cols){
        colsHead += cols[index];
    }
    colsHead += "]],";
    return colsHead;
}

//清除所有行的状态
function clearAllRowStatus(){
    $("#tabGrid" + tabIndex).datagrid("clearSelections");	// 清除所有已选行
}

//设置分页1
function setPage1(){
    var pager = $("#tabGrid2" + rowIndex).datagrid("getPager");
    var options = pager.data("pagination").options;
    var total = options.total;
    var pageCount = Math.ceil(total/options.pageSize);
    pager.pagination({
        pageSize: 20,
        pageList:[10,20,30,40,50],
        showPageList:true,
        beforePageText: '第',
        afterPageText: '页    共 {pages} 页',
        displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录/ ' + pageCount + '页',

        layout:['list','sep','first','prev','next','last','refresh']

    });
}

//设置分页2
function setPage(){
    var pager = $("#tabGrid" + tabIndex).datagrid("getPager");
    var options = pager.data("pagination").options;
    var total = options.total;
    var pageCount = Math.ceil(total/options.pageSize);
    pager.pagination({
        pageSize: 20,
        pageList:[10,20,30,40,50],
        beforePageText: '第',
        afterPageText: '页    共 {pages} 页',
        displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录/ ' + pageCount + '页',
        showPageList:true,
        layout:['list','sep','first','prev','next','last','refresh']
    });
    if(tabIndex==2){
        $("#tabGrid" + tabIndex).datagrid("selectRow",0);
    }
}

//1是编辑，3是添加，0是查看，所调用的函数
function editClass(tabIndex,rowindex,row,msg,menuIndex){
    currentRow=row;
    currentRowIndex=rowindex;
    var url,height;
    var width=360;
    //当1是 class面板，3是教师tabs
    if(tabIndex==1){
        url="./editClass.html";
        height=300;
    }else if(tabIndex==3){
        url="./editTeacher.html";
        height=320;
    }
    var btn;       //menuIndex:0为查看，1为编辑，2为添加
    if(menuIndex==0){
        btn=createBtn(menuIndex,"查看");
    }
    if(menuIndex==1){
        btn=createBtn(menuIndex,"编辑");
    }
    if(menuIndex==3){
        btn=createBtn(menuIndex,"添加");
    }
    createWindow(rowindex,msg, url, btn, width, height, menuIndex)
}

//删除行所调用的方法
function removeClass(rowindex,row,msg,menuIndex){
    var content=createWindowDiv(row,msg,menuIndex);
    var btn = createBtn(menuIndex,"删除");
    var width = 300;
    var height;
    if(tabIndex==1){
        height=280;
    }else if(tabIndex==3){
        height=320;
    }
    createWindow(rowindex,msg, content, btn, width, height, menuIndex);
}

//创建删除所需要的内容
function createWindowDiv(row,msg,menuIndex){
    var delMsg="确定要"+msg+"信息吗？";
    if(msg=="删除班级"){
        //alert(row.name);
        var pcon="<p>名称："+row.name+"</p><p>年级："+row.classes+"</p><p>班主任："+row.headteacher+"</p>" +
            "<p>任课老师："+row.teacher+"</p><p>人数："+row.number+"</p>";
    }else if(msg=="删除教师"){
        var pcon="<p>姓名："+row.name+"</p><p>年龄："+row.old+"</p><p>入职年份："+row.year+"</p>" +
            "<p>性别："+row.sex+"</p><p>婚姻状况："+row.states+"</p><p>住址："+row.addr+"</p>";
    }
    pcon=delMsg+pcon;
    var content="<div id='layoutPadding' style='padding:15px;'>"+pcon+"</div>";
    return content;
}
