import { FormControl, FormGroup } from "@angular/forms";

export default class FormHelper{

   static markFormDirty(formgroup: FormGroup){
        Object.keys(formgroup.controls).forEach(key =>{
          const control = formgroup.get(key);
          if (control instanceof FormControl){
            control?.markAsDirty({ onlySelf: true});
          } else if (control instanceof FormGroup) {
            this.markFormDirty(control);
          }
        });
      }
}