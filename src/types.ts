import { Context as BContext, NarrowedContext, Types } from 'telegraf'

export type MatchedContext<
    C extends BContext,
    T extends Types.UpdateType | Types.MessageSubType
    > = NarrowedContext<C, Types.MountMap[T]>