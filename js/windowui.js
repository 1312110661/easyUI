var currentRow,currentRowIndex;
//创建window
function createWindow(rowindex,msg, content, btn, width, height, menuIndex) {
    currentRowIndex=rowindex;
    $("<div id=\"win\"><div id=\"winLayOut\" style=\"margin:10px;\"></div></div>").appendTo(document.body);
    $("#win").window({
        title: tabTitleStr + " - " + msg,
        modal: true,
        width: width,
        height: height,
        cache: false,
        minimizable: false,
        maximizable: false,
        closable: false,
        collapsible: false
    });
    $("#winLayOut").layout({
        fit: true
    });
    if (menuIndex == 2) {
        //alert(menuIndex);
        $("#winLayOut").layout("add", {
            region: "center",
            style: {"padding": "0 20px 0 0"},
            content: content
        });
    }else{
        $("#winLayOut").layout("add", {
            region: "center",
            style: {"padding": "0 20px 0 0"},
            href: content,
            onLoad:function(){
                if(menuIndex!=3){
                    showData(menuIndex);
                }
            }
        });
    }
    $("#winLayOut").layout("add",{
        region:"south",
        border:false,
        style:{"text-align":"right","padding":"10px 20px 20px 0"},
        content:btn
    });

}
//创建两个按钮事件，并在提交的时候，验证数据
function createBtn(menuIndex,btnText){
    var btn_ok="<a class=\"easyui-linkbutton\" data-options='iconCls:\"icon-ok\"'" +
        "href=\"javascript:void(0)\" onclick=\"javascript:test("+menuIndex+")\" style=\"margin-right:8px;\">"+btnText+"</a>";
    var btn_cancel="<a class=\"easyui-linkbutton\" data-options='iconCls:\"icon-cancel\"'" +
        "href=\"javascript:void(0)\" onclick=\"javascript:closeWindow()\">取消</a>";
    return btn_ok + btn_cancel;
}
//当点击查看，编辑的时候获取的value值
function showData(menuIndex){
    if(tabIndex==1){
        $("#name1").textbox({
            value:currentRow.name
        });
        $("#classes").textbox({
            value:currentRow.classes
        });
        $("#headteacher").textbox({
            value: currentRow.headteacher
        });
        $("#teacher").textbox({
            value: currentRow.teacher
        });
        $("#number").textbox({
            value: currentRow.number
        });
        if(menuIndex == 0){
            $("#name1").textbox("disable");
            $("#classes").textbox("disable");
            $("#headteacher").textbox("disable");
            $("#teacher").textbox("disable");
            $("#number").textbox("disable");
        }
    }else{
        $("#name2").textbox({
            value:currentRow.name
        });
        $("#old").textbox({
            value:currentRow.old
        });
        $("#year").textbox({
            value: currentRow.year
        });
        $("#sex").textbox({
            value: currentRow.sex
        });
        $("#states").textbox({
            value: currentRow.states
        });
        $("#addr").textbox({
            value: currentRow.addr
        });
        if(menuIndex == 0){
            $("#name2").textbox("disable");
            $("#old").textbox("disable");
            $("#year").textbox("disable");
            $("#sex").textbox("disable");
            $("#states").textbox("disable");
            $("#addr").textbox("disable");
        }
    }
}
//点击确定按钮时候测试
function test(menuIndex){
    if(menuIndex==1){
        submitClassForm();
    }else if(menuIndex==2){
        delClass();
    }else if(menuIndex==3){
        addClass();
    }
    closeWindow();
}
//提交验证信息
var form1,flag;
function submitClassForm(){
    if(tabIndex==1){
        form1=$("#form1");
        flag="./jsp/editClass.jsp";
    }else if(tabIndex==3){
        form1=$("#form2");
        flag="./jsp/editTeacher.jsp";
    }
    form1.form("submit",{
        url:flag,
        onSubmit:function(){
            return form1.form("validate");
        },
        success:function(data){
            //返回的包含json数组的字符串
            setClassColVal("#tabGrid", tabIndex, currentRowIndex, data,"修改成功");
        }
    });
}
//成功的时候将提交测数据传给所在的行
function setClassColVal(dataObj, tabIndex, currentRowIndex, data, title){
    var ticket,ticketRow;
    if(tabIndex==1){
        ticket = eval("(" + data + ")");  //把提交的带有json字符串的data变成数组

        // eval可以吧字符串转换为表达式并计算结果，也可以把字符串转换为数组
        // 根据当前选项卡中的DataGrid更新对应行数据
        $(dataObj + tabIndex).datagrid("updateRow", {
            index: currentRowIndex,
            row: {
                name:ticket.name,       //对应name：datagrid-data20.json数组中的名字；ticket.name：data里的value（name：ticket.name）
                classes:ticket.classes,
                headteacher:ticket.headteacher,
                teacher:ticket.teacher,
                number:ticket.number
            }
        });
        $.messager.alert(title, "名称为 " + ticket.name + " 的班级信息修改成功!");
    }else{
        ticket = eval("(" + data + ")");
        // 根据当前选项卡中的DataGrid更新对应行数据
        $(dataObj + tabIndex).datagrid("updateRow", {
            index: currentRowIndex,     //当前行的下标
            row: {
                name:ticket.name,  //json的name：提交数据name的value  key：value
                old:ticket.old,
                year:ticket.year,
                sex:ticket.sex,
                states:ticket.states,
                addr:ticket.addr
            }
        });
        $.messager.alert(title, "名字为 " + ticket.name + " 的教师信息修改成功!");
    }
}
//删除行
function delClass(){
    console.log(currentRowIndex);
    $("#tabGrid"+tabIndex).datagrid("deleteRow",currentRowIndex);
    $.messager.alert("提示信息","删除成功！","info");
}
//添加行
function addClass(){
    if(tabIndex==1){
        $('#tabGrid'+tabIndex).datagrid('insertRow',{
            index: currentRowIndex,	// 索引从0开始
            row: {
                name:$("#name1").val(),
                classes:$("#classes").val(),
                headteacher:$("#headteacher").val(),
                teacher:$("#teacher").val(),
                number:$("#number").val()
            }
        });
    }else{
        $('#tabGrid'+tabIndex).datagrid('insertRow',{
            index: currentRowIndex,	// 索引从0开始
            row: {
                name:$("#name2").val(),
                old:$("#old").val(),
                year:$("#year").val(),
                sex:$("#sex").val(),
                states:$("#states").val(),
                addr:$("#addr").val()
            }
        });
    }
    $.messager.alert("提示信息","添加成功！","info");
}
//关闭window窗口
function closeWindow(){
    $("#win").window("close");
    $("#win").remove();
}