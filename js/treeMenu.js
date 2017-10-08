/**
 * Created by Administrator on 2016/12/7.
 */
function contextMenuShow(e,node){
    e.preventDefault();
    $("#treeMenu").tree("select",node.target);
    $("#treeContextMenu").menu("show",{
        left: e.pageX,
        top:e.pageY
    });
    if(node.state=="open"){
        $("#treeContextMenu").menu("disableItem", $("#op"));
        $("#treeContextMenu").menu("enableItem", $("#cl"));
    }else{
        $("#treeContextMenu").menu("disableItem", $("#cl"));
        $("#treeContextMenu").menu("enableItem", $("#op"));
    }
}
function append(){
    var node=$("#treeMenu").tree("getSelected");
    $("#treeMenu").tree("append",{
        parent:(node?node.target:null),
        data:[{
            text:"新增文本内容",
            attributes:{
                flagIndex:-1
            }
        }]
    })
}
function edit(){
    var node=$("#treeMenu").tree("getSelected");
    //console.log(node.text);
    $("#treeMenu").tree("beginEdit",node.target);
}
function afterEdit(node){
    alert("节点名字编辑成功,新名字为:"+node.text);
}
function removeit(){
    var node=$("#treeMenu").tree("getSelected");
    $("#treeMenu").tree("remove",node.target);
}
function expand(){
    var node=$("#treeMenu").tree("getSelected");
    $("#treeMenu").tree("expand",node.target);
}
function collapse(){
    var node=$("#treeMenu").tree("getSelected");
    $("#treeMenu").tree("collapse",node.target);
}
