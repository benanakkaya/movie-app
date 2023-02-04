import React from 'react'

function Footer() {
    return (
        <footer>
            <div className='container site-footer p-4'>
                <div className='row'>
                    <div className='site-info col-md-5 mb-2'>
                        <img className='website-logo footer-logo' src={require('../images/website-logo.png')} alt='site-logo' />
                        <small className='ms-3'>© 2022, Tüm Hakları Saklıdır.</small>
                    </div>
                    <div className='site-text col-md-7'>
                        <p className='text-end'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est, tempora eligendi. Sapiente impedit in fuga. Officiis, dolore distinctio? At officiis vel fugit nulla ad error perferendis, sapiente ratione nostrum aliquam voluptas! Maxime neque ipsum saepe molestias repudiandae, nam id voluptatem eius sint quidem rerum laudantium, doloribus sunt veniam vitae cum nulla. Libero soluta voluptates, eius, earum quo nemo illo, nesciunt nulla tempora nobis quasi dolor dolore ratione doloribus. </p>
                        <p className='text-end mt-3'>Nemo explicabo obcaecati minus facere enim. Rem voluptate porro odio necessitatibus qui amet quos omnis aliquid incidunt, nam consequatur tempore? Laboriosam nihil blanditiis maiores doloribus ratione id quae dignissimos hic est laborum, iure minima libero vero? Repellat illo quas aperiam rerum! Ducimus, voluptatibus nulla? Amet aperiam distinctio deserunt perferendis, vitae earum, atque autem harum dignissimos tenetur est!</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}


export default Footer;