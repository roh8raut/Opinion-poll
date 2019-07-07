var data = require('./question.json');


class questionGenerator{
    private name: any ;
    private questionContainer: HTMLElement; 
    private allForms: any;
    private ansArr: any = [];
    private opinionObj: any = {opinionData: []};
    

    constructor(){
        this.questionContainer = document.querySelector(".bodycontainer");
        this.name =  document.querySelector("#name");

        this.name.addEventListener("keyup", (eve: any) => {
           if(this.name.value.length < 3){
                this.name.nextElementSibling.style.display = "block";
                (document.querySelector(".submitName") as HTMLButtonElement).disabled = true;
           } else {
                this.name.nextElementSibling.style.display = "none";
                (document.querySelector(".submitName") as HTMLButtonElement).disabled = false;
           }
        })

        document.querySelector(".submitName").addEventListener("click", () => {
            this.name = this.name.value;
            document.querySelector("#myModal").classList.remove("show");
            (document.querySelector(".name") as HTMLElement).innerText = `Welcome   `+ this.name +  '  \u{263B}';;

        })
    }

    public generateQuestion(){
        
        data.forEach((ques: any, i: number) => {
            const options = ques.options;
            // const opt = document.querySelector(".question")
            this.questionContainer.innerHTML += `<p class="question">${ques.id}) &nbsp ${ques.text}</p> 
                                                <form class="myForm" name="form${ques.id}">` +
                                                    options.map((option: any) => {
                                                    
                                                        return `
                                                                    <div class="radio">
                                                                        <label><input type="radio" name="optradio">${option}</label>
                                                                    </div>
                                                            
                                                                `
                                                    }).join(""); +
                                                 ` </form>`                                                       
        })

        this.validatInputs();
    }

    public validatInputs() {
        let breakLoop: boolean = false;
        
        this.allForms = document.querySelectorAll(".myForm");
        document.querySelector(".submit").addEventListener("click", (e: any) => {
            
            this.allForms.forEach((ele: any) => {
                if(!breakLoop){
                    let inputs: any = ele.getElementsByTagName("input");
                    let checked: boolean = false;
                    for(let i of inputs){
                        if(i.checked){
                            checked = true;
                            let selectedOption = i.parentElement.innerText;
                            let quesId = i.closest("form").previousElementSibling.innerText.substring(2).trim();
                            this.ansArr.push({ques: quesId, answer: selectedOption});
                        } 
                    }
                    if(!checked){
                        alert("select all checkbox...")
                        breakLoop = true;
                    }
                }
               
            })

            if(!breakLoop){
                console.log("ans arr>>>>>>>.", this.ansArr);
                this.submitOpinion(this.ansArr);
            }
        })
    }    
    public submitOpinion(ansArr: any) {     
        this.opinionObj.opinionData.push({name: this.name, opinions: ansArr});
        console.log(JSON.stringify(this.opinionObj));
        var ale = `Thanks for submitting your opinions ${this.name}`;
        alert(ale);
        location.reload();     
    }   


}

export { questionGenerator };

