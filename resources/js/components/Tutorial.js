import React from 'react';
import ReactDOM from 'react-dom';


export default function Tutorial() {
  return (
    <div className="container">
      <StaticPageTitle title="Interactive Tutorial" />
      <TutorialText />
    </div>
  )
}

function StaticPageTitle(props) {
  return (
    <h1>{ props.title }</h1>
  )
}

function TutorialText() {
  return (
    <div className="tutorial">
      <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tincidunt felis sit amet ipsum ultrices vestibulum. Duis dictum dignissim enim. Aliquam malesuada mauris mattis diam placerat condimentum. Curabitur porta eros magna, at accumsan augue convallis non. Pellentesque iaculis finibus tristique. Mauris nec ipsum a velit accumsan auctor nec a tortor. In tristique nulla tincidunt ex tempor, a vulputate massa malesuada. In consectetur ex sed sem pretium tempus. Pellentesque id erat ex. Phasellus a tempor nulla. Pellentesque vestibulum elit lacus, eget dignissim augue efficitur et. Nunc convallis molestie urna, sed sollicitudin tellus vulputate sed.
      </div>
      <div>
        Donec et turpis augue. In nec nisl ex. Nulla sollicitudin, magna vel blandit fermentum, odio neque pretium lectus, ac tincidunt nibh ante et dui. Donec ut ante eu arcu tristique porta porta non quam. Quisque maximus ac sem sit amet faucibus. Donec mollis in ligula eu viverra. Sed et nisl vitae mauris dignissim cursus. Nam in turpis lacus. Duis et augue dapibus, maximus urna vitae, mattis nibh. Pellentesque accumsan porttitor accumsan. Pellentesque quam elit, imperdiet vel volutpat non, efficitur sed orci. Fusce a erat vel turpis finibus egestas. Maecenas facilisis arcu augue, non pharetra sem ornare sit amet. Nulla varius libero id velit euismod, sit amet feugiat nunc egestas.
      </div>

      <div id="monkeyscripts-tutorial-widget" className="card-body" style={{background: 'red'}} ><center><b>If the background is red, the script has not been installed. If it is green, it has been.</b></center></div>
    </div>
  )
}