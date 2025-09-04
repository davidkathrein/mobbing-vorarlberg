
// import { FC, Suspense } from 'react'
// import Link from 'next/link'
// import { getPayload } from 'payload'
// import Image from 'next/image'
// import configPromise from '@payload-config'

// // import { Gallery as GalleryProps } from '@/payload-types'
// import { cn } from '@/utilities/ui'
// import HeaderLowImpact from '@/components/Headers/LowImpact'
// import HeaderHighImpact from '@/components/Headers/HighImpact'
// import MemberWDescription from './HighImpact/index'
// import MemberWODescription from './LowImpact/index'

// type Props = GalleryProps & {
//   // potentially add filters here later (eg. for Angebotsseite)
// }

// export const TeamList: FC<Props> = (props) => {
//   return <Suspense fallback={<div>Loading Team...</div>}>{renderTeamList(props)}</Suspense>
// }

// const renderTeamList = async (props: Props) => {
//   const config = await configPromise

//   const payload = await getPayload({ config })

//   const members = await payload
//     .find({
//       collection: 'users',
//       depth: 1,
//     })
//     .then((res) => {
//       return res.docs
//     })

//   return (
//     <section>
//       <div className={cn('container', props.caption && 'border-t')}>
//         {props.caption && (
//           <span className="text-caption -ml-6 -mt-3.5 block w-max bg-gray-50 px-6 dark:bg-gray-950">
//             {props.caption}
//           </span>
//         )}
//         {props.type === 'highImpact' && props.paragraph && (
//           <HeaderHighImpact heading={props.heading} paragraph={props.paragraph} />
//         )}
//         {props.type === 'lowImpact' && <HeaderLowImpact heading={props.heading} />}
//         <div className={cn(props.type === 'highImpact' ? 'mt-12 md:mt-24' : 'mt-6')}>
//           <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
//             {members.map((member, index) => {
//               return props.type === 'highImpact' ? (
//                 <MemberWDescription key={member.id} member={member} />
//               ) : (
//                 <MemberWODescription member={member} index={index} key={member.id} />
//               )
//             })}
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }
