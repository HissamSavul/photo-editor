/*  -----------------Variable lists-------------------  */
/* using QuerySelector for using named references for convenience*/
const Filters = ["Brightness", "Saturation", "Inversion","Grayscale"];
var FilterVals = [100,100,0,0];
const Rotate_or_Flips = ["left", "right", "horizontal","vertical"];
var Rotate_or_FlipVals = [0,0,1,1];
const ExtraFilters = ["blur", "rotate", "sepia"];
var ExtraFilterVals = [0,0,0];

var Filter_or_RotateFlip_or_Extra;
var filterClicked ="", filterClickedIndex ="", inputVal="",inputVal2="",inputVal3="",inputVal4="", slideType="";
var RFClicked ="", RFClickedIndex ="";
var extraClickedIndex ="";
var imageNameCounter = 1;
var sourceImg;

/* for image */
const imgis = document.querySelector(".preview-img img")
const fileImg = document.querySelector(".file-input");

/* for buttons */
const filterButtons = document.querySelectorAll(".filter button");
const RotateButtons = document.querySelectorAll(".rotate button");
const ExtraSliders = document.querySelectorAll(".slider_options .name2");

/* for slider */
const extraFilterPage= document.querySelector(".extra-filter");
const sliderName = document.querySelector(".filter-info .name");
const sliderValue = document.querySelector(".filter-info .value");
const filter_Slider = document.querySelector(".filter .slider input");

/* for 3 separate sliders*/
const extra1val = document.querySelector(".filter-info .value1");
const extra1slider = document.querySelector(".filter .ExtraSlider1 input");
const extra2val = document.querySelector(".filter-info .value2");
const extra2slider = document.querySelector(".filter .ExtraSlider2 input");
const extra3val = document.querySelector(".filter-info .value3");
const extra3slider = document.querySelector(".filter .ExtraSlider3 input");

/* for apllying filter to image */
const applyFilter = document.querySelector(".preview-img img");

/*  -----------------Functions-------------------  */
function removeDisable(){
  document.getElementById("div1").className = "container";
  filterButtons[0].click();
}
/* function for giving option for choosing file from user hdd */
function chooseImg() {
  fileImg.click();
  /* adding event listener to change image upon selection */
  fileImg.addEventListener("change",uploadImg);
}

/* function for selecting file object and uploading it if found*/
const uploadImg = () => {
  let readFile = new FileReader();
  if(imgis.complete){
    readFile.onload = () => {
      imgis.src = readFile.result;
      sourceImg = readFile.result;
    }
    readFile.readAsDataURL(event.target.files[0]);
    removeDisable();
  }
}

/* function to pick clicked button  for filters*/
const ActiveFilterButton = (buttonis) => {
  for(var findex=0 ;findex<filterButtons.length; findex++){
    if(filterButtons[findex].id !== buttonis.target.id)
      filterButtons[findex].classList.remove('active');
    else{  
      filterButtons[findex].classList.add('active');
      filterClicked = filterButtons[findex].id; /* keeping track of clicked button for durther */
      Filter_or_RotateFlip_or_Extra = "Filter";
      ClickedButton();
      filter_Slider.addEventListener("input", ChangeFilterSliderValue);
    }
  }
}

/* function to pick clicked button  for rotate/flip*/
const RotateButton = (buttonis) => {
  for(var rindex=0 ;rindex<RotateButtons.length; rindex++){
    if(RotateButtons[rindex].id === buttonis.target.id){
      RFClicked = RotateButtons[rindex].id; /* keeping track of clicked button for durther */
      Filter_or_RotateFlip_or_Extra = "RotateFlip";
      ClickedButton();
      updateImg();
    }
  }
}

const ExtraSliderOptions = () => {
  Filter_or_RotateFlip_or_Extra = "Extra";
  ClickedButton();
  if(extraClickedIndex === 0)
    extra1slider.addEventListener("input", ChangeExtraFilterSliderValue);
  else if(extraClickedIndex === 1)
    extra2slider.addEventListener("input", ChangeExtraFilterSliderValue);
  else if(extraClickedIndex  === 2)
    extra3slider.addEventListener("input", ChangeExtraFilterSliderValue);
}

/* function to assign changed slider value to picked filter*/
const ClickedButton = () => { 
  /* finding index of clicked button */
  if(Filter_or_RotateFlip_or_Extra === "Filter")
    FilterButtonUpdateValue();
  else if(Filter_or_RotateFlip_or_Extra === "RotateFlip")
    RotateButtonUpdateValue();
  else if(Filter_or_RotateFlip_or_Extra === "Extra")
    ExtraSliderUpdateValue();  
}

const FilterButtonUpdateValue = () => {
  //console.log(filterClicked);
  for(var index=0 ; index<filterButtons.length; index++){
    if(filterButtons[index].innerHTML === filterClicked)
      filterClickedIndex = index;
  }
  /* inserting changed values upon input of the active button */
  sliderName.innerText = Filters[filterClickedIndex];
  sliderValue.innerText = FilterVals[filterClickedIndex].toString() + '%';
  filter_Slider.value = FilterVals[filterClickedIndex];
}

const RotateButtonUpdateValue = () => {
  for(var index=0 ; index<RotateButtons.length; index++){
    if(RotateButtons[index].id === RFClicked)
      RFClickedIndex = index;
  }
  /* inserting changed values upon input of the active button */
  if(RFClickedIndex === 0){
    Rotate_or_FlipVals[0] -= 90;
    //ExtraFilterVals[1] = Rotate_or_FlipVals[0];
  }
  else if(RFClickedIndex === 1){
    Rotate_or_FlipVals[0] += 90;
    //ExtraFilterVals[1] = Rotate_or_FlipVals[0];
  }
  else if(RFClickedIndex === 2){
    if(Rotate_or_FlipVals[2] === 1)
      Rotate_or_FlipVals[2] = -1;
    else
      Rotate_or_FlipVals[2] = 1;
  }
  else if(RFClickedIndex === 3){
    if(Rotate_or_FlipVals[3] === 1)
      Rotate_or_FlipVals[3] = -1;
    else
      Rotate_or_FlipVals[3] = 1;
  }
}

const ExtraSliderUpdateValue = () => {
    extra1val.innerText = ExtraFilterVals[0].toString() + 'px';
    extra1slider.value = ExtraFilterVals[0];
    extra2val.innerText = ExtraFilterVals[1].toString() + 'deg';
    extra2slider.value = ExtraFilterVals[1];
    extra3val.innerText = ExtraFilterVals[2].toString() + '%';
    extra3slider.value = ExtraFilterVals[2];
}

/* function to apply changes to picked filter */
const ChangeFilterSliderValue = () => {
  /* user clicked filter */
  inputVal = filter_Slider.value; 
  sliderValue.innerText = inputVal.toString() + '%';
  /* chnaging the slider value of the clicked filter */
  FilterVals[filterClickedIndex] = inputVal;
  updateImg();
}

const ChangeExtraFilterSliderValue = () => {
  inputVal2 = extra1slider.value; 
  extra1val.innerText = inputVal2.toString() + 'px';
  ExtraFilterVals[0] = inputVal2;
  inputVal3 = extra2slider.value; 
  extra2val.innerText = inputVal3.toString() + 'deg';
  ExtraFilterVals[1] = inputVal3;
  inputVal4 = extra3slider.value; 
  extra3val.innerText = inputVal4.toString() + '%';
  ExtraFilterVals[2] = inputVal4;
  updateImg();
}

/* functions to apply filters,,rotates and flips */
const updateImg = () =>{
  applyFilter.style.filter = 'brightness(' + FilterVals[0] + '%)' + 'saturate(' + FilterVals[1] + '%)' + 'invert(' + FilterVals[2] + '%)' +  'grayscale(' + FilterVals[3] + '%)' +  'blur(' + ExtraFilterVals[0] + 'px)' + 'sepia(' + ExtraFilterVals[2] + '%)'; 
  applyFilter.style.transform = 'rotate(' + Rotate_or_FlipVals[0] + 'deg)' +  'rotate(' + ExtraFilterVals[1] + 'deg)' + 'scale(' + Rotate_or_FlipVals[2] + ',' + Rotate_or_FlipVals[3] + ')';
}

function resetImgChanges() {
  /* initializing to initial values */
  FilterVals = [100,100,0,0];
  Rotate_or_FlipVals = [0,0,1,1];
  ExtraFilterVals = [0,0,0];
  /* reseting the clicked filter back to brightness*/
  for(var i=0 ; i<filterButtons.length; i++){
    if(i===0)
      filterButtons[i].classList.add('active');
    else
      filterButtons[i].classList.remove('active');
  }
  /*recalling clicked ftns to reset based on initial values*/
  Filter_or_RotateFlip_or_Extra = "Filter";
  filterClicked = filterButtons[0].innerText;
  ClickedButton();
  Filter_or_RotateFlip_or_Extra = "Extra";
  ClickedButton();
  updateImg();
}

function saveImg(){
  const myCanvas = document.createElement("canvas");
  const ctx = myCanvas.getContext("2d");
  var getImage = document.getElementById('image1'); 
  myCanvas.width = getImage.clientWidth;
  myCanvas.height = getImage.clientHeight;

  ctx.filter = 'brightness(' + FilterVals[0] + '%)' + 'saturate(' + FilterVals[1] + '%)' + 'invert(' + FilterVals[2] + '%)' +  'grayscale(' + FilterVals[3] + '%)' +  'blur(' + ExtraFilterVals[0] + 'px)' + 'sepia(' + ExtraFilterVals[2] + '%)'; 
  /* to bring image to centre */
  ctx.translate(myCanvas.width*0.5, myCanvas.height*0.5);
  ctx.rotate(ExtraFilterVals[1]*Math.PI/180);
  ctx.rotate(Rotate_or_FlipVals[0]*Math.PI/180);    
  ctx.scale(Rotate_or_FlipVals[2], Rotate_or_FlipVals[3]);  
  ctx.drawImage(getImage, -myCanvas.width*0.5, -myCanvas.height*0.5, myCanvas.width, myCanvas.height);
  const downloadLink = document.createElement("a");
  downloadLink.download = "myImage" + imageNameCounter.toString() + ".jpg";
  imageNameCounter++;
  downloadLink.href = myCanvas.toDataURL();
  downloadLink.click();
}

/*  -----------------int main-------------------  */
/*Functionality for all filters as well as transformations*/
for (var i = 0; i < filterButtons.length; i++) {
  let buttonis="";
  filterButtons[i].addEventListener("click", ActiveFilterButton);
  buttonis="";
  RotateButtons[i].addEventListener("click", RotateButton); 
  if(i<ExtraSliders.length){
    extraClickedIndex = i;
    ExtraSliderOptions();
  }
}