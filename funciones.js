let titulo = "Titulo";
let state1 = "";/*Ha sido eliminado el mensaje de la caja 1*/
let head = ""; //Ponemos elementos nuevos al head  CSS
let arrayCSS =[];
let  tamanoLetra = 10;

function vaciar(control){
    if(state1 == ""){
        state1 = control.value;
        control.value='';
        control.innerHTML ='';  
    }
}
function fill(control){
    
}


function newButton(){
    if(document.getElementById("previewButton").style.display!='block')
        document.getElementById("previewButton").style.display='block';
    else
        document.getElementById("previewButton").style.display=''; 
}

function setText(){
    document.getElementById("previewTxt").innerHTML = document.getElementById("txtIn").value;
    document.getElementById("txtIn").value =''; 
   
}

function setButton(){
    document.getElementById("previewBot").value = document.getElementById("txtBotIn").value;
    document.getElementById("txtBotIn").value='';//document.getElementById("conBotIn").value;
    document.getElementById("conBotIn").value='';
    showBot();
}

function setKeys(){
    let tmp = document.getElementById("keyIn").value;
    tmp = tmp.replace(/,/g,'-');
    document.getElementById("previewKeys").innerHTML = tmp;
    document.getElementById("keyIn").value ='';
   
}
function confirmObj(){
    document.getElementById('textDocument').innerHTML += document.getElementById("previewObjectContainer").innerHTML;
    localStorage.chat += document.getElementById("previewObjectContainer").innerHTML;
    console.log(localStorage.getItem('chat'));
    //document.getElementById("previewTxt").value ='';
    document.getElementById("previewTxt").innerHTML ='';
    //document.getElementById("previewKeys").value ='';
    document.getElementById("previewKeys").innerHTML ='';
    //document.getElementById("previewBot").value ='';
    document.getElementById("previewBot").value ='';
    hideBot();
}
function showBot(){
    document.getElementById("previewBot").style.display='block';
}

function hideBot(){
    document.getElementById("previewBot").style.display='none';
}

function show(){
    document.getElementById('chatDestiny').innerHTML = localStorage.chat;
}
//+++++++++++++++++++++++OTHER SHITS++++++++++++++++++++++++++++++++++++++++++++++
function convertir(){
    let textoE = document.getElementById('textAreaLeft').value;
   
    textoE = getSpaces(textoE);

    if(is_valid(textoE)){
        
       /* document.getElementById('textAreaRight').innerHTML =texto;*/
        let textoS =getFormat(textoE);
        document.getElementById('textAreaRight').value =textoS;
    }
}
function getSpaces(strIn){
    let result = "";//strIn;//TODO debe comenzar vacío
   
    let vec= strIn.split(/\n/g);//no tendremos mas '\n'
    console.log("cantidad de elems:"+vec.length);
    let t = "";
    let type_margin = 0;
    let type = "";
    
    for(let i =0;i<vec.length;i++){
        t = vec[i];
        type_margin = count_initial_spaces(t); 
        type = cssPart(type_margin,t);
        if(type !== "")
            type = "p" +type;
        result += "                <p class=\"" + type + "\">"+ t + "</p>"+ "\n";  
    }
    
    console.log(t);
    return result;
}
//Create y manage new data for CSS
function cssPart(type_margin,t){
    let result = "0";
    if(type_margin != 0){
        //clasificamos según sea el "tipo"
      //TODO check if undifeed es correctp
        if(arrayCSS[type_margin]===undefined){
            head += "            p.p"+type_margin+"{\n               margin-left: "+(type_margin * tamanoLetra)+"px;\n            }\n";
            arrayCSS[type_margin]= true;           
        }        
        result = type_margin + "";
    }
    return result;
}


function count_initial_spaces(txt){
    let cant_spaces = 0;
    for(let i=0;i<txt.length && txt[i]=== " ";i++)
        cant_spaces++;
    return cant_spaces;
}

function getTitulo(){
    titulo= document.getElementById('tituloIn').value;
}

function getFormat(texto){
    let result = `<!DOCTYPE html>
<html class="sr" lang="en" prefix="og: http://ogp.me/ns#" data-react-helmet="lang,prefix">
    <head> 
        <title>
            `
    result += titulo;
    result += `
        </title>
`
    if(head !== ""){
        head = `
        <style type="text/css">
`+head+`
        </style>`;
    }    
    result += head + `
    </head>
    <body>
`;
    result += texto;
    result +=`
    </body>
</html>
                    `;
    return result;
}

function is_valid(str){
    let bool = false;
    if(str !== ''){
        console.log('distinto de vacio:'+str);
        bool= true;
    }
    return bool;
}
