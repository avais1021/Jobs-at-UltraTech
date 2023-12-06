const newCrrVacancies__jobs = document.querySelector('.newCrrVacancies__jobs');
const viwe_all_btn = document.querySelector('#viwe_all_btn');
let newVaccFindJobBtn = document.querySelector('.newVaccFindJobBtn');

let maxCardCount = 6;
let city = document.querySelector('#city');
let functionArea = document.querySelector('#function');


const getData = () => {
    const request = new XMLHttpRequest();
    request.open('GET', 'https://www.ultratechcement.com/content/ultratechcementwebsite/api.career-api-get.json');
    request.send();
    request.onload = () => {
        if (request.status === 200) {

            const data = JSON.parse(request.response);
            // cardsArray = [];

            const findJobs = () => {
                let vaccJobTitle = document.querySelector('.newVaccJobTitle');
                let newVaccCity = document.querySelector('.newVaccCity');
                let newVaccFunction = document.querySelector('.newVaccFunction');

                const fJobsInfo = JSON.parse(request.response);
                fJobsInfo.Master.forEach((ele) => {
                    vaccJobTitle.innerHTML += `
            <option class="newVaccJobTitle_option" value="${ele.designation}">${ele.designation}</option>
          `;
                    newVaccCity.innerHTML += `
            <option value="${ele.location}" class="newVaccCity_option">${ele.location}</option>
          `;
                    newVaccFunction.innerHTML += `
            <option value="${ele.fuction}" class="newVaccFunction_option">${ele.fuction}</option>
          `;
                });
            };
            findJobs();

            document.querySelector('.loading_data').style.display = 'none';

            data.Master.slice(0, maxCardCount).forEach((item, index) => {
                const newVaccDiv = document.createElement('div');
                newVaccDiv.classList.add('newCrrVacancies__jobs__card');
                newVaccDiv.innerHTML = `
                          <div class="newCrrVacancies__jobs__row1">
                            <p class="job_field">${item.business_unit_name}</p>
                            <div class="newCrrVacancies__jobs__shareIcon">
                              <img src="images/shareIcon.png" alt="">
                            </div>
                          </div>
                          <h2>${item.designation}</h2>
                          <p class="job_discription">${item.job_title}</p>
                          <h4>Location: <span class="newCardLoca">${item.location}</span></h4>
                          <div class="newCrrVacancies__jobs__row2">
                            <button>Apply Now</button>
                            <p class="posted">Posted: 24 hours ago</p>
                          </div>
                        `;
                newCrrVacancies__jobs.appendChild(newVaccDiv);
                // cardsArray.push(newVaccDiv);
            });

            viwe_all_btn.addEventListener('click', () => {
                maxCardCount = data.Master.length;
                document.querySelector('.loading_data').style.display = 'block';
                getData();
            });

            newVaccFindJobBtn.addEventListener('click', () => {
                const locationVal = city.value.toUpperCase();
                const functionVal = functionArea.value.toUpperCase();

                if (locationVal === '' && functionVal === '') {
                    newCrrVacancies__jobs.innerHTML = '';

                    data.Master.slice(0, maxCardCount).forEach((item, index) => {
                        const newVaccDiv = document.createElement('div');
                        newVaccDiv.classList.add('newCrrVacancies__jobs__card');
                        newVaccDiv.innerHTML = `
                                  <div class="newCrrVacancies__jobs__row1">
                                    <p class="job_field">${item.business_unit_name}</p>
                                    <div class="newCrrVacancies__jobs__shareIcon">
                                      <img src="images/shareIcon.png" alt="">
                                    </div>
                                  </div>
                                  <h2>${item.designation}</h2>
                                  <p class="job_discription">${item.job_title}</p>
                                  <h4>Location: <span class="newCardLoca">${item.location}</span></h4>
                                  <div class="newCrrVacancies__jobs__row2">
                                    <button>Apply Now</button>
                                    <p class="posted">Posted: 24 hours ago</p>
                                  </div>
                                `;
                        newCrrVacancies__jobs.appendChild(newVaccDiv);
                    });
                } else {

                   const filterData = data.Master.filter((item) => {
                        const cardLocation = item.location.toUpperCase();
                        const cardFunction = item.fuction.toUpperCase();

                        return (cardLocation.includes(locationVal)) && (cardFunction.includes(functionVal));
                    })

                    newCrrVacancies__jobs.innerHTML = '';

                    filterData.forEach((item)=>{
                        const newVaccDiv = document.createElement('div');
                        newVaccDiv.classList.add('newCrrVacancies__jobs__card');
                        newVaccDiv.innerHTML = `
                                  <div class="newCrrVacancies__jobs__row1">
                                    <p class="job_field">${item.business_unit_name}</p>
                                    <div class="newCrrVacancies__jobs__shareIcon">
                                      <img src="images/shareIcon.png" alt="">
                                    </div>
                                  </div>
                                  <h2>${item.designation}</h2>
                                  <p class="job_discription">${item.job_title}</p>
                                  <h4>Location: <span class="newCardLoca">${item.location}</span></h4>
                                  <div class="newCrrVacancies__jobs__row2">
                                    <button>Apply Now</button>
                                    <p class="posted">Posted: 24 hours ago</p>
                                  </div>
                                `;
                        newCrrVacancies__jobs.appendChild(newVaccDiv);
                    })
                }
            })

        } else {
            console.log(`error ${request.status}`);
        }
    };
};





getData();