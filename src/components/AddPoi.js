import { useRef, useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import clsx from 'clsx'
import mapboxgl from 'mapbox-gl'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'

export default function AddPoi () {
  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN

  const mapContainerRef = useRef(null)
  const [locationName, setLocationName] = useState('')
  const [address, setAddress] = useState('')
  const [notes, setNotes] = useState('')
  const [images, setImages] = useState('')
  const [category, setCategory] = useState('')
  const [feedbackMsg, setFeedbackMsg] = useState('')

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/tombousquet/ckinqejtv0v2617ms4kflvkp8',
      // centered on durham
      center: [-78.8986, 35.9940],
      zoom: 13
    })
    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true
      })
    )
    // search and locate by address, name
    map.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl
      })
    )

    // zoom buttons
    map.addControl(new mapboxgl.NavigationControl(), 'top-right')
    return () => map.remove()
  }, [])

  function handleSubmit (event) {
    event.preventDefault()
    axios.post('----------------', {
      locationName: locationName,
      address: address,
      notes: notes,
      images: images,
      category: category
    }, {})
      .then(response => {
        setFeedbackMsg({ type: 'success', message: 'Point of Interest was successfully added!' })
        console.log(response)
      })
      .catch(error => {
        setFeedbackMsg({ type: 'error', message: 'Information was invalid' })
        console.log(error)
      })
  }

  if (feedbackMsg.type === 'success') {
    return (
      <div>
        <Redirect exact to='/map' />
      </div>
    )
  }

  return (
    <div className='ma3'>
      <div className='ma3'>
        <h1 className='center title'>Add a Point of Interest</h1>
      </div>
      <div>
        {
        feedbackMsg &&
        (
          <div className={clsx(
            {
              'bg-red': (feedbackMsg.type === 'error'),
              white: (feedbackMsg.type === 'error'),
              'bg-green': (feedbackMsg.type === 'success')
            }
          )}
          >
            {feedbackMsg.message}
          </div>
        )
      }
        <div className='map-container center ma3 mapAdd' ref={mapContainerRef} />
        <div>
          <form className='form' onSubmit={handleSubmit}>
            <div>
              <div className='mh2 mv3'>
                <label className='mv2  mh2 b' htmlFor='title'>Location Name</label>
                <input
                  className='mh4'
                  required
                  type='text'
                  id='locationName'
                  value={locationName}
                  onChange={event => setLocationName(event.target.value)}
                  placeholder='Name of Location'
                />
              </div>
              <div className='mh2 mv3'>
                <label className='mv2 b mh2' htmlFor='authors'>Address</label>
                <input
                  className='mh1'
                  required
                  type='text'
                  id='address'
                  value={address}
                  onChange={event => setAddress(event.target.value)}
                  placeholder='Address'
                />
              </div>
              <div className='mh2 mv3'>
                <label className='mv2 b mh2' htmlFor='status'>Notes</label>
                <input
                  className='mh3'
                  required
                  type='text'
                  id='status'
                  value={notes}
                  onChange={event => setNotes(event.target.value)}
                  placeholder='Add your notes here...'
                />
              </div>
              <div className='mh2 mv3'>
                <label className='mv2 b mh2' htmlFor='status'>Image</label>
                <input
                  className='mh3'
                  required
                  type='text'
                  id='image'
                  value={images}
                  onChange={event => setImages(event.target.value)}
                  placeholder='Add your images...'
                />
              </div>
              <div className='mh2 mv3'>
                <label className='mv2 b mh2' htmlFor='status'>Category</label>
                <select
                  className='mh3'
                  required
                  id='category'
                  value={category}
                  onChange={event => setCategory(event.target.value)}
                >
                  <option value='null'>Choose from below</option>
                  <option value='business'>Business</option>
                  <option value='church'>Church</option>
                  <option value='house'>House</option>
                  <option value='lot'>Lot</option>
                </select>
              </div>
            </div>
            <div>
              <button className='ml6 mv2 ' type='submit'>Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
