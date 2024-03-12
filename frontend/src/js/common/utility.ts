function Utility(this:any){
     this.getIDOfTheInputElement= function (id: string){
        return document.getElementById(id) as HTMLInputElement | HTMLFormElement;
      };
      this.setAttributes=function(){ };
}
const utility = new Utility();
export default utility;