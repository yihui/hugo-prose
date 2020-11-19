local({
  if (!file.exists('config.yaml')) setwd('exampleSite/')
  for (f in c('~/.Rprofile', '.Rprofile')) {
    if (file.exists(f)) sys.source(f, environment())
  }
  options(blogdown.themesDir = '../..')
})
