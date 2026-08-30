import { z } from 'zod'
import type { GraphQlData } from './graphql'

export const BaseUserSchema = z.object({
  firstName: z.string().min(1, 'Le prénom est requis'),
  lastName: z.string().min(1, 'Le nom est requis'),
  username: z.string().optional(),
  email: z.email("L'email est invalide"),
  dateOfBirth: z.string().optional(),
  gender: z.enum(['Woman', 'Man']).default('Woman'),
  telephone: z.object({
    countryCode: z.string().regex(/^\+\d{1,3}$/, "L'extension est invalide").optional(),
    phone: z.string().optional(),
  })
})

export const UpdatePersonalDataSchema = BaseUserSchema.omit({ email: true })

export const UserSchema = BaseUserSchema.pick({
  firstName: true,
  lastName: true,
  email: true,
  username: true
})

export type UserDetails = GraphQlData<'user', z.infer<typeof UserSchema>>

export type UpdateProfileFormData = z.infer<typeof UpdatePersonalDataSchema>

export const BaseAddressSchema = BaseUserSchema.pick({
  lastName: true,
  firstName: true,
  // email: true,
  telephone: true,
}).extend({
  address: z.string().min(1, "L'adresse est requise"),
  city: z.string().min(1, 'La ville est requise'),
  postalCode: z.string().min(1, 'Le code postal est requis'),
  province: z.string().min(1, 'La province est requise'),
  country: z.string().min(1, 'Le pays est requis'),
  isBusiness: z.boolean().default(false),
  businessName: z.string().optional(),
  vatNumber: z.string().optional(),
  siretNumber: z.string().optional(),
})

export type AddressFormData = z.infer<typeof BaseAddressSchema>

export const GenderAddressSchema = BaseUserSchema.pick({
  gender: true,
}).extend(BaseAddressSchema.shape)

export type GenderAddressFormData = z.infer<typeof GenderAddressSchema>

export const UpdatePasswordSchema = z.object({
  newPassword: z.string().min(8, 'Le nouveau mot de passe doit contenir au moins 8 caractères'),
  confirmNewPassword: z.string().min(1, 'La confirmation du nouveau mot de passe est requise'),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: 'Les mots de passe ne correspondent pas',
  path: ['confirmNewPassword'],
})

export type UpdatePasswordFormData = z.infer<typeof UpdatePasswordSchema>

export const UpdateEmailSchema = z.object({
  newEmail: z.email(),
  confirmNewEmail: z.string().min(1, 'La confirmation du nouvel email est requise'),
}).refine((data) => data.newEmail === data.confirmNewEmail, {
  message: "Les emails ne correspondent pas",
  path: ['confirmNewEmail'],
})

export type UpdateEmailFormData = z.infer<typeof UpdateEmailSchema>
