import S from './styles.module.scss'

interface MovieCardSkeletonProps {
  upcoming?: boolean
}

export const MovieCardSkeleton = ({ upcoming }: MovieCardSkeletonProps) => {
  const repeat = new Array(5).fill(null).map((_, i) => i + 1)

  return (
    <>
      {repeat.map((r) => (
        <div key={r} className={S.container}>
          <div className={S.image}></div>
          {!upcoming && <div className={S.grade}></div>}
          {upcoming && <span className={S.upcoming}></span>}
          <span className={S.title}></span>
          <button className={S.seeMore}></button>
        </div>
      ))}
    </>
  )
}