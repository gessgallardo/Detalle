/*
 --
 -- Clase Detalle;
 -- tipo: DOM;
 --
*/
(function(){
  var Detalle = function(identificador, type, nombre, value, editable, visible){
    this.idDetalle = identificador;
    this.label = '';
    this.controls = '';
    this.control_group = '';
    this.control_group = document.createElement("div");
    this.control_group.className= "control-group detalle_"+identificador;
    this.textarea = null;
    this.imageUpload = null;
    this.botonUpload = null;
    this.input = null;
    this.elemento = null;
    this.select = null;
    this.tipo = type;

    var label_txt = document.createTextNode(nombre);

    this.label = document.createElement('label');
    this.label.className = "control-label";
    this.label.setAttribute("for", nombre);

    this.controls = document.createElement("div");
    this.controls.className = "controls";

    this.label.appendChild(label_txt);

    if(visible != undefined && visible == false) {
      this.control_group.style.height = 0;
      this.control_group.style.overflow = "hidden";
    }


    switch(type){
      case "textarea":
        var text_node = document.createTextNode(value);

          this.textarea = document.createElement("textarea");
          this.textarea.id = identificador;
          this.textarea.className = "textarea";
          if(editable != undefined && editable == false) this.textarea.disabled = "disabled";

          this.textarea.appendChild(text_node);
          this.controls.appendChild(this.textarea);
        break;

      case "imageUpload":
        var previewZone = document.createElement("div");
          previewZone.id = "previewZone";

        if(value != undefined && value != null){ previewZone.style.backgroundImage = "url("+value+")"; }

        var inputZone = document.createElement("div");
          inputZone.id = "inputZone";

          this.imageUpload = document.createElement("input");
          this.imageUpload.type = "file";
          this.imageUpload.id = "fileInput";
          this.imageUpload.setAttribute("disabled", "disabled");
          this.imageUpload.style.display = "none";

          this.botonUpload = document.createElement("button");
          this.botonUpload.id = "fileButton";
          this.botonUpload.className = "btn btn-info btn-block";
          this.botonUpload.innerHTML = "<i class='icon-picture icon-white'></i> Seleccionar Imagen";
          if(editable != undefined && editable == false) this.botonUpload.disabled = "disabled";


          inputZone.appendChild(this.imageUpload);
          inputZone.appendChild(this.botonUpload);

          this.controls.appendChild(inputZone);
          this.controls.appendChild(previewZone);
      break;

      case "select":
          this.select = document.createElement("select");
          this.select.id = identificador;
          this.select.className = "select";
          this.select.setAttribute("size", "3");

          thisSelect = this.select;


          if(editable != undefined && editable == false) this.select.disabled = "disabled";

          var option, option_text;

          var opciones = [];

          if(typeof value == "function") { opciones = value(); }else{ opciones = value; }


          $.each(opciones, function(i_sel, val){
            if(typeof val == "object"){
              option = document.createElement("option");
              option_text = document.createTextNode(val["name"]);
              option.value = val["value"];
              option.className = "proveedor-"+val["id"];
              option.setAttribute("data-id", val["id"]);
              option.appendChild(option_text);
              thisSelect.appendChild(option);
            }
          });

          this.controls.appendChild(this.select);
          this.select.selectedIndex = 0;
        break;

      case "titulo":
          this.input = document.createElement("input");
          this.input.setAttribute("placeholder", nombre);
          this.input.setAttribute("type", "text");
          this.input.id = identificador;
          this.input.className = "input titulo";

          if(value == undefined || value == null){ value = ""; }

          this.input.value = value;

          this.input.disabled = "disabled";

          this.controls.appendChild(this.input);
      break;

      default:
          this.input = document.createElement("input");
          this.input.setAttribute("placeholder", nombre);
          this.input.setAttribute("type", "text");
          this.input.id = identificador;
          this.input.className = "input";

          if(value == undefined || value == null){ value = ""; }

          this.input.value = value;

          if(editable != undefined && editable == false) this.input.disabled = "disabled";

          this.controls.appendChild(this.input);
      break;
    }



    this.control_group.appendChild(this.label);
    this.control_group.appendChild(this.controls);
  }

  Detalle.prototype = {
    getId: function(){return this.idDetalle;},
    getLabel: function(){return this.label;},
    getControls: function(){return this.controls;},
    getDetalle: function(){return this.control_group;},
    getInput: function(){return this.input;},
    getTextarea: function(){return this.textarea;},
    getData: function(data){
      if(this.input != null) return this.input.getAttribute(data);
      if(this.textarea != null){
        return this.textarea.getAttribute(data);
      }
      if(this.select != null){
        return $(this.select).find(":selected").attr(data);
      }
    },
    getValue: function(){
      if(this.input != null) return this.input.value;
      if(this.textarea != null){
        return this.textarea.value;
      }
      if(this.select != null){
        return $(this.select).find(":selected").val();
      }
    },
    setValue: function(value){
      if(this.input != null) this.input.value = value;
      if(this.textarea != null){
        this.textarea.value = value;
      }
    },
    getTitle:function(){
      var label = this.getLabel();
      return $(label).text();
    },
    setTitle:function(text){
      var label = this.getLabel();
      $(label).text(text);
    },
    show: function(bool){
      if(bool){
        $(this.control_group).animateWithCss({height:this.getHeight()}, 550, 'ease-in-out');
      }else{
        $(this.control_group).animateWithCss({height:0}, 550, 'ease-in-out');
      }
    },
    getHeight: function(){
      return $(this.label).outerHeight(true) + $(this.controls).outerHeight(true);
    },
    getSelected: function(){
      if(this.select != null){
        return $(this.select).find(":selected");
      }
    },
    selectByValue: function(val){
      var detail = this;
      if(detail.select != null){
        for(var i=0, len = detail.select.options.length; i<len; i++){
          if(detail.select.options[i].value == val){
            detail.select.selectedIndex = i;
          }
        }
      }
    },
    setSize: function(size){
      var detail = this;
        detail.select.setAttribute('size', size);
    },
    editar: function(bool){
      if(bool){
        if(this.input != null) $(this.input).removeAttr("disabled");
        if(this.textarea != null) $(this.textarea).removeAttr("disabled");
        if(this.select != null) $(this.select).removeAttr("disabled");
        if(this.botonUpload != null) $(this.botonUpload).removeAttr("disabled");
        if(this.imageUpload != null) $(this.imageUpload).removeAttr("disabled");
      }else{
        if(this.input != null) $(this.input).attr("disabled", "disabled");
        if(this.textarea != null) $(this.textarea).attr("disabled", "disabled");
        if(this.select != null) $(this.select).attr("disabled", "disabled");
        if(this.botonUpload != null) this.botonUpload.disabled = "disabled";
        if(this.imageUpload != null) this.imageUpload.disabled = "disabled";
      }
    }
  };

  window.Detalle = function(identificador, type, nombre, value, editable, visible){
    return new Detalle(identificador, type, nombre, value, editable, visible);
  }

})();
