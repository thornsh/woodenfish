// import { Component } from 'react'
// import { connect } from 'react-redux'
import { View, Button, Text, Image } from '@tarojs/components'
import { useEffect, useRef, useState } from 'react'
import { TaroElement } from '@tarojs/runtime'
import { useSelector, useDispatch } from 'react-redux'
import muyuimage from '../../images/muyu.png'
import muyump3 from '../../audios/muyu1.mp3'
import { add, minus, asyncAdd } from '../../actions/counter'
import './index.scss'
import Taro from '@tarojs/taro'

let mp3: Taro.AudioContext = null

export default function() {
  const { num } = useSelector((state: any) => {
    return {
      num: state.counter.num
    }
  })

  const dispatch = useDispatch()

  const [tmp, setTmp] = useState([])

  function createAudio() {
    const innerAudioContext = wx.createInnerAudioContext({
      useWebAudioImplement: true // 是否使用 WebAudio 作为底层音频驱动，默认关闭。对于短音频、播放频繁的音频建议开启此选项，开启后将获得更优的性能表现。由于开启此选项后也会带来一定的内存增长，因此对于长音频建议关闭此选项
    })
    innerAudioContext.src = 'https://img.tukuppt.com/newpreview_music/09/00/71/5c89465032f0c47285.mp3'

    innerAudioContext.play() // 播放
    mp3 = innerAudioContext
  }

  function vibrate() {
    Taro.vibrateShort({
      type: 'heavy',
    })
  }

  useEffect(() => {
    // createAudio()
  }, [])

  const click = () => {
    setTmp([...tmp, 1])
    console.log(mp3)
    createAudio()
    vibrate()
    dispatch(add())
  }

  const muyuRef = useRef<TaroElement>(null)

  const muyuClick = () => {
    console.log(111)
    console.log(muyuRef.current?.className)
  }

  const touchStart = () => {
    console.log(33)
    const muyu = muyuRef.current
    muyu!.className = 'muyuimage small'
  }

  const touchEnd = () => {
    console.log(44)
    const muyu = muyuRef.current
    muyu!.className = 'muyuimage'

    click()
  }

  return (
    <View className='index'>
      <View className='text-div'>
        {
          tmp.map((item, index) => (
            <Text key={index} className='text'>功德 +1</Text>
          ))
        }
      </View>
      <Image
        className='muyuimage'
        lazyLoad
        src={muyuimage}
        onTouchStart={touchStart}
        onTouchEnd={touchEnd}
        ref={muyuRef}
      ></Image>
      <View>
        <Text className='total-text'>总功德：{num}</Text>
      </View>
    </View>
  )
}
