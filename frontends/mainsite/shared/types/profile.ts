import { z } from 'zod'

export const BaseProfileSchema = z.object({
  firstName: z.string().min(1, 'Le prénom est requis'),
  lastName: z.string().min(1, 'Le nom est requis'),
  email: z.email("L'email est invalide"),
  dateOfBirth: z.string().optional(),
  gender: z.enum(['Woman', 'Man']).default('Woman'),
  telephone: z.object({
    countryCode: z.string().regex(/^\+\d{1,3}$/, "L'extension est invalide").optional(),
    phone: z.string().optional(),
  })
})

export const UpdatePersonalDataSchema = BaseProfileSchema.omit({ email: true })

export type UpdateProfileFormData = z.infer<typeof UpdatePersonalDataSchema>

export const BaseAddressSchema = BaseProfileSchema.pick({
  lastName: true,
  firstName: true,
  email: true,
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
