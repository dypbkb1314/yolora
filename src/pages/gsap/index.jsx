import React, { useEffect, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './index.less';

gsap.registerPlugin(ScrollTrigger);

const Child = ({className, children}) => {
    return <div className={"box " + className}>{children}</div>
}

export default function Gsap(){
    const boxRef = useRef(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            gsap.to(".box", {
                x: 400,
                duration: 2,
                scrollTrigger: {
                    trigger: ".box",
                    pin: ".box",
                    markers: true,
                    start: 'top 300px', // 距离视口顶部300触发
                    end: 'top 100px', // 距离视口顶部100停止
                    scrub: true,
                },
            });
        })
        return () => ctx.revert()
    })

    return (
        <div ref={boxRef} style={{ height: '500vh' }}>
            <div className="box"></div>
            <div className="animate"></div>
        </div>
    )
}

// scrollTrigger: {
//     trigger: '.selector', // 选择器或元素
//         start: 'top center',  // [trigger start] [scrollor start] 位置
//         // 或者使用相对量： '+=500'
//         end: '20px 80%',      // [trigger end] [scrollor end] 位置
//         scrub: true,          // ⭐ 是否跟随滚动条滚动 或者 追赶时间（单位s）
//         pin: true,            // ⭐ 或者 要pin的选择器或者元素
//
//         // 只用于开发模式，
//         // 或 {startColor: '#fff', endColor: 'red'} 自定义标记颜色
//         markers: true,
//         // 对应事件： onEnter onLeave onEnterBack onLeaveBack
//         // 其余可选actions: complete | reverse | none
//         toggleActions: 'play pause resume reset', // ⭐
//         toggleClass: 'active',
//         fastScrollEnd: true,       // 或者 速度值
//         containerAnimation: tween, // 线性动画
//         id: 'my-id',
//         anticipatePin: 1, // 可能避免跳跃
//         snap: {
//         // 或者 ’labels‘ 或者 函数 或者 数组
//         snapTo: 1 / 10, // 进度增量，每次 1 / 10
//             duration: 0.5,
//             direction: true,
//             ease: 'power3',
//             onComplete: callback,
//         // 其它回调： onStart, onInterrupt
//     },
//     pinReparent: true,         // 在pin的时候移到 documentElement
//         pinSpacing: true,          // ⭐
//         pinType: 'transform',      // 或者 'fixed'
//         pinnedContainer: '.selector',
//         preventOverlaps: true,     // 或任意 字符串
//         once: true,
//         endTrigger: '.selector',   // selector | element
//         horizontal: true,          // 切换模式
//         invalidateOnRefresh: true, // 刷新时清除开始值
//         refreshPriority: 1,        // 影响刷新顺序
//         onEnter: callback
//     // 其余回调
//     // onLeave | onEnterBack | onLeaveBack | onUpdate
//     // onToggle | onRefresh | onRefreshInit | onScrubComplete
// }
