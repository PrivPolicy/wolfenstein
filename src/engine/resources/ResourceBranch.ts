import { Resource } from "./Resource"
import { Shaders } from "./Shader"
import { Sound, Sounds } from "./Sound"
import { Texture, Textures } from "./Texture"
import { TextureAnimated, TexturesAnimated } from "./TextureAnimated"
import { TextureConditional, TexturesConditional } from "./TextureConditional"
import { TextureData, TexturesData } from "./TextureData"
import { SoundsVariant, TexturesVariant, Variant } from "./Variant"

export type ResourceBranch<T extends Shaders | Textures | Sounds | TexturesData> = {
    [key in T]: T extends Textures ? Texture
    : T extends TexturesData ? TextureData
    : T extends Sounds ? Sound
    : Resource
}

export type VariantBranch<T extends SoundsVariant | TexturesVariant> = {
    [key in T]: T extends SoundsVariant ? Variant<Sounds>
    : Variant<Textures>
}

export type TexturesConditionalBranch = {
    [key in TexturesConditional]: TextureConditional
}

export type TextureAnimatedBranch = {
    [key in TexturesAnimated]: TextureAnimated
}