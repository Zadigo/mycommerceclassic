<template>
  <div id="ecommerce-menu" class="absolute top-0 left-0 w-full min-h-100 bg-white shadow-sm mt-[64px] p-15">
    <div class="grid grid-cols-12">
      <ul class="col-span-3 border-r border-slate-400 h-full p-5">
        <li v-for="link in links" :key="link.title" class="group">
          <nuxt-link :to="link.to" class="block py-2 px-4 hover:bg-slate-50 hover:underline rounded-lg transition-all ease-in-out duration-300" @mouseenter="selectSublinks(link)">
            <span>{{ link.title }}</span>
            <icon name="i-lucide-chevron-right" class="hidden group-hover:inline w-4 h-4 float-right" />
          </nuxt-link>
        </li>
      </ul>
      
      <div class="col-span-9 h-full p-5 flex justify-between gap-5">
        <div v-for="(subLinks, idx) in currentSublinks" :key="idx">
          <h4 v-if="subLinks.groupTitle" class="font-bold text-slate-400">
            {{ subLinks.groupTitle }}
          </h4>
          
          <ul>
            <li v-for="link in subLinks.links" :key="link.title" class="py-1">
              <nuxt-link :to="link.to" class="hover:underline">
                {{ link.title }}
                <span v-if="link.label" class="ml-2 text-xs text-white bg-blue-500 rounded px-1">{{ link.label }}</span>
              </nuxt-link>
            </li>
          </ul>
        </div>

        <div v-if="currentLink" class="flex gap-2 items-center">
          <div v-for="image in currentLink.subGroupImage" :key="image.url" class="mb-4">
            <nuxt-img :src="image.url" :alt="image.title" height="400" class="rounded-lg" />
            <h5 v-if="image.title" class="font-semibold mt-2">{{ image.title }}</h5>
            <p v-if="image.description" class="text-sm text-slate-600">{{ image.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
type EcommerceMenuLink = {
  title: string
  to: string
}

type EcommerceMenuGroupImage = {
  url: string
  title?: string
  description?: string
}

type EcommerceSublink = {
  groupTitle?: string
  links: (EcommerceMenuLink & { label?: 'New' | 'Sale' | 'Popular' | undefined | (string & {}) })[]
}

type EcommerceMenuLinks = EcommerceMenuLink & {
  subLinks: EcommerceSublink[]
  subGroupImage: EcommerceMenuGroupImage[]
}

const links: EcommerceMenuLinks[] = [
  {
    title: 'Women',
    to: '/',
    subLinks: [
      {
        groupTitle: 'Tops',
        links: [
          {
            title: 'Tops',
            to: '/',
            label: 'New',
          }
        ],
      },
    ],
    subGroupImage: [
      {
        url: '/img1.webp',
        title: 'New Arrivals',
        description: 'Check out our latest collection.'
      }
    ],
  },
  {
    title: 'Men',
    to: '/',
    subLinks: [
      {
        groupTitle: 'Shorts',
        links: [
          {
            title: 'Shorts',
            to: '/',
            label: 'New',
          },
          {
            title: 'Pantalons',
            to: '/'
          }
        ]
      }
    ],
    subGroupImage: [
      {
        url: '/img1.webp',
        title: 'New Arrivals',
        description: 'Check out our latest collection.'
      },
      {
        url: '/img2.webp',
        title: 'New Arrivals',
        description: 'Check out our latest collection.'
      }
    ]
  }
]

const currentLink = ref<EcommerceMenuLinks | null>(null)
const _currentSublinks = ref<EcommerceSublink[]>([])
const currentSublinks = refDebounced(_currentSublinks, 300)

const selectSublinks = (link: EcommerceMenuLinks) => {
  currentLink.value = link
  _currentSublinks.value = link.subLinks
}
</script>
