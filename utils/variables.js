import { colors } from "./colors"

export const themes = {
  default:{
    outerGradient:'#D9ECF3',
    innerGradient:'#FFFFFF',
    text:'#000000',
    accent:'#EF6345',
    overlay:'rgba(255,255,255,0.5)',
    card_bg_color:'#EDF2F4',
    shadow:'#1B2B47',
    button_shadow:'rgba(0, 0, 0, 0.5)',
    ingredient_hover:'#EFE5E1',
    text_hover:'black',
    delete_color:'#EF6345',
    back_color:'black',
    sign_color:'black',
    para_color:'black',
  },
  dark:{
    outerGradient:'#000000',
    innerGradient:'#1B2B47',
    text:'#FFFFFF',
    accent:'#EF6345',
    overlay:'rgba(27,43,71,0.5)',
    card_bg_color:'#1B2B47',
    shadow:'#FFFFFF',
    button_shadow:'rgba(255, 255, 255, 0.5)',
    ingredient_hover:'#FAFAFA',
    text_hover:'#EF6345',
    delete_color:'#EF6345',
    back_color:'white',
    sign_color:'white',
    para_color: 'white',
  }
}

export const comp_themes = {
  default: {
    nav_bg_color:"#FFF",
    text_color:"#000",
    switch_border_color:'#1B2B47',
    switch_bg_color:'#1B2B47',
    slider_bg_color:'#1B2B47',
    ingredient_border_color: colors.orange
  },
  dark: {
    nav_bg_color:"#101929",
    text_color:"#FFF",
    switch_border_color:'white',
    switch_bg_color:'white',
    slider_bg_color:'#EDF2F4',
    ingredient_border_color: 'white'
  }
}

export const view_themes = {
  default: {
    flex_direction:'row',
    flex_wrap:'wrap',
    card_flex_direction:'column',
    card_width:'300px',
    mealcard_width:'170px',
    mealcard_title_width:'50px',
    drop_width:'12vw',
    img_display:'block',
    justify_content:'center',
    card_padding:'20px',
    mealcard_padding:'5px',
    card_text_width:'200px',
    text_align:'center'
  },
  list: {
    flex_direction:'column',
    flex_wrap:'nowrap',
    card_flex_direction:'row',
    card_width:'70vw',
    mealcard_width:'170px',
    mealcard_title_width:'80vw',
    drop_width:'70vw',
    img_display:'none',
    justify_content:'space-between',
    mealcard_padding:'5px',
    card_padding:'5px',
    card_text_width:'400px',
    text_align:'left'
  }
}

export const number_themes = {
  default: {
    items:12
  },
  one: {
    items:1
  },
  three: {
    items:3
  },
  six: {
    items:6
  },
  nine: {
    items:9
  },
  fifteen: {
    items:15
  },
  twenty: {
    items:20
  },
  thirty: {
    items:30
  }
}