import React from 'react'
import AllCategories from "./AllCategories"
import MostViewedSide from "./MostViewedSide"

export default function SideMenu() {
  return (
        <div className='side-menu ms-0 pt-5 col-md-12'>
            <AllCategories />
            <MostViewedSide />
        </div>

  )
}
