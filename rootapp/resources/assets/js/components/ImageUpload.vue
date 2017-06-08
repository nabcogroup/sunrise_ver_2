<template>
    <div>
        <!--UPLOAD-->
       
        <div class="dropbox">
            <input type="file" accept="image/*" class="input-file" @change="previewImage" >
            <p >Uploading files...</p>
        </div>
         <div class="image-preview">
            <img class="preview" v-for="img in imageData" :src="img.blob">
        </div>
    </div>
</template>

<script>   
    export default {
        data() {
            return {
                imageData: []
            }
        },
        methods: {
            previewImage(event) {
                    // Reference to the DOM input element
                    var input = event.target;
                    // Ensure that you have a file before attempting to read it
                    if (input.files && input.files[0]) {
                        var $this = this;
                        for(var i =0; i < input.files.length;i++) {
                            var reader = new FileReader();
                            var file = input.files[i];
                            var data = {};
                            reader.onload = (e) => { 
                                data.blob = e.target.result; 
                                data.file = file;
                                $this.imageData.push(data);
                                this.$emit('dispatch',data);
                            };
                            reader.readAsDataURL(input.files[i]);
                        }
                    }
            }
        }
    }
</script>

<style lang="scss">
    .dropbox {
        outline: 2px dashed grey; /* the dash box */
        outline-offset: -10px;
        background: lightcyan;
        color: dimgray;
        padding: 5px 5px;
        min-height: 30px; /* minimum height */
        position: relative;
        cursor: pointer;
        margin-bottom: 10px;
    }
  .input-file {
    opacity: 0;  /*invisible but its there! */
    width: 100%;
    min-height: 50px;
    position: absolute;
    cursor: pointer;
  }

  .dropbox:hover {
    background: lightblue; /* when mouse over to the drop zone, change color */
  }

  .dropbox p {
    font-size: 1.2em;
    text-align: center;
    padding: 10px 0;
  }

  img.preview {
    width: 200px;
    background-color: white;
    border: 1px solid #DDD;
    padding: 5px;
}
</style>