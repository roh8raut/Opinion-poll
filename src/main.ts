var data = require('./question.json');
const questionContainer = document.querySelector(".bodycontainer");
data.forEach((ques: any, i: number) => {
    console.log(ques);
    const options = ques.options;
    // const opt = document.querySelector(".question")
    questionContainer.innerHTML += `<p class="question">${ques.id}) &nbsp ${ques.text}</p>` + 
                                        options.map((option: any) => {
                                           
                                            return `<form>
                                                        <div class="radio">
                                                            <label><input type="radio" name="optradio">${option}</label>
                                                        </div>
                                                    </form>
                                                    `
                                        }).join("");                                                        
})



console.log("home",data);