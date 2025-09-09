import React, { Fragment } from 'react'

import type { Config, Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/default/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/default/CallToAction/Component'
import { ContentBlock } from '@/blocks/default/Content/Component'
import { FormBlock } from '@/blocks/default/Form/Component'
import { MediaBlock } from '@/blocks/default/MediaBlock/Component'
import { LogoCloud } from '@/blocks/LogoCloudOneLine/Component'
import { TeamList } from '@/blocks/Team/Component'
import { FaqThree } from '@/blocks/Faq/Component'

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  logos: LogoCloud,
  teamList: TeamList,
  faq: FaqThree,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
  locale: Config['locale']
}> = (props) => {
  const { blocks, locale } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div className="my-20" key={index}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer locale={locale} />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
