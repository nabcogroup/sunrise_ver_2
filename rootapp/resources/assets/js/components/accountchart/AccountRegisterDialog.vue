<template>
<v-dialog dialog-title="Account Chart List" modal-id="accountList" v-model="toggle" @dismiss="save">
    <div class="form-horizontal">
      <v-input-wrapper label="Serial Number" label-class="col-md-3 text-right">
          <input class="form-control" type="text" name="serial_number">
      </v-input-wrapper>

        <v-input-wrapper label="Property" label-class="col-md-3 text-right">
            <select class="form-control">
                <option value="">--ACCOUNT TYPE--</option>
                <option></option>
            </select>

        </v-input-wrapper>
        <v-input-wrapper label="Description" label-class="col-md-3 text-right">
            <textarea class="form-control"></textarea>
        </v-input-wrapper>

    </div>
</v-dialog>
</template>
<script>
  export default {
    
  }
</script>
