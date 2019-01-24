<template>
    <div id="articleInfo">
      <ok-header></ok-header>

      <Row type="flex" align="middle" justify="center" class="code-row-bg row-title">
        <i-col span="10">
          <span class="article_title">
            SpringBoot自动配置原理
            {{$route.params.article_id}}
          </span>
        </i-col>
      </Row>

      <Row type="flex" align="middle" justify="center" class="code-row-bg row-userInfo">
        <i-col span="10" style="line-height: 60px" >
          <div style="float: left">
            <a style="text-decoration: none;margin: 0 10px">
              <img src="https://i.loli.net/2017/08/21/599a521472424.jpg"  alt="none" class="img-circle" width="45px"/>
            </a>
          </div>

          <div style="line-height: 30px;">
            <a><span>丿丶祥灬少</span></a>
            <br>
            <span style="color: gray"> <Time :time="push_time" type="datetime" /></span>&emsp;
            <span><Icon type="md-heart" color="rgb(251, 114, 153)" size="18"/>&nbsp;<label style="margin: 0;padding: 0">1.88W</label></span>&emsp;
            <span><Icon type="md-eye" size="18" />&nbsp;<label style="margin: 0;padding: 0">1.88W</label></span>
          </div>
        </i-col>
      </Row>


      <Row type="flex" align="middle" justify="center" class="code-row-bg row-content">
        <i-col span="10">
          <div class="article_content">
            <!-- 复制粘贴过来的，死样式，后面再删 start -->
            <div class="article fmt article__content" data-id="1190000018011535" data-license="nd">

              <h1 id="articleHeader0">前言</h1>
              <blockquote>只有光头才能变强。</blockquote>
              <blockquote>文本已收录至我的GitHub仓库，欢迎Star：<a href="https://github.com/ZhongFuCheng3y/3y" rel="nofollow noreferrer" target="_blank">https://github.com/ZhongFuCheng3y/3y</a>
              </blockquote>
              <p>回顾前面Spring的文章(以学习的顺序排好)：</p>
              <ul>
                <li><a href="https://mp.weixin.qq.com/s?__biz=MzI4Njg5MDA5NA==&amp;mid=2247483942&amp;idx=1&amp;sn=f71e1adeeaea3430dd989ef47cf9a0b3&amp;chksm=ebd74327dca0ca3141c8636e95d41629843d2623d82be799cf72701fb02a665763140b480aec&amp;scene=21#wechat_redirect" rel="nofollow noreferrer" target="_blank">Spring入门这一篇就够了</a></li>
                <li><a href="https://mp.weixin.qq.com/s?__biz=MzI4Njg5MDA5NA==&amp;mid=2247483946&amp;idx=1&amp;sn=bb21dfd83cf51214b2789c9ae214410f&amp;chksm=ebd7432bdca0ca3ded6ad9b50128d29267f1204bf5722e5a0501a1d38af995c1ee8e37ae27e7&amp;scene=21#wechat_redirect" rel="nofollow noreferrer" target="_blank">Spring【依赖注入】就是这么简单</a></li>
                <li><a href="https://mp.weixin.qq.com/s?__biz=MzI4Njg5MDA5NA==&amp;mid=2247483954&amp;idx=1&amp;sn=b34e385ed716edf6f58998ec329f9867&amp;chksm=ebd74333dca0ca257a77c02ab458300ef982adff3cf37eb6d8d2f985f11df5cc07ef17f659d4&amp;scene=21#wechat_redirect" rel="nofollow noreferrer" target="_blank">Spring【AOP模块】就这么简单</a></li>
                <li><a href="https://mp.weixin.qq.com/s?__biz=MzI4Njg5MDA5NA==&amp;mid=2247483965&amp;idx=1&amp;sn=2cd6c1530e3f81ca5ad35335755ed287&amp;chksm=ebd7433cdca0ca2a70cb8419306eb9b3ccaa45b524ddc5ea549bf88cf017d6e5c63c45f62c6e&amp;scene=21#wechat_redirect" rel="nofollow noreferrer" target="_blank">Spring【DAO模块】知识要点</a></li>
                <li><a href="https://mp.weixin.qq.com/s?__biz=MzI4Njg5MDA5NA==&amp;mid=2247483973&amp;idx=1&amp;sn=dda2252f37e5eb6db90db636a65c40bf&amp;chksm=ebd74344dca0ca52d671fc0fa072bcc80892bfb5801ceaab6a4754036d246f5bef960c1840bd&amp;scene=21#wechat_redirect" rel="nofollow noreferrer" target="_blank">SpringMVC入门就这么简单</a></li>
                <li><a href="https://mp.weixin.qq.com/s?__biz=MzI4Njg5MDA5NA==&amp;mid=2247483973&amp;idx=2&amp;sn=483265ffa9087ca956ec2d637119a5f8&amp;chksm=ebd74344dca0ca5298b894fbb706c26ee942a423e858e27679f06df4b83899e1a97cc9d5eb97&amp;scene=21#wechat_redirect" rel="nofollow noreferrer" target="_blank">SpringMVC【开发Controller】详解</a></li>
                <li><a href="https://mp.weixin.qq.com/s?__biz=MzI4Njg5MDA5NA==&amp;mid=2247484008&amp;idx=2&amp;sn=44e15b795eda5e1f112bf663cc146bf7&amp;chksm=ebd74369dca0ca7fedadb2835d80896df76fa5279a9db38abccceb2b25c9ee95d549cc9010ed&amp;scene=21#wechat_redirect" rel="nofollow noreferrer" target="_blank">SpringMVC【参数绑定、数据回显、文件上传】</a></li>
                <li><a href="https://mp.weixin.qq.com/s?__biz=MzI4Njg5MDA5NA==&amp;mid=2247484008&amp;idx=3&amp;sn=5719448dab8d9c3d7e8c91261db4c1a2&amp;chksm=ebd74369dca0ca7f51637c13b09579572d3e2960b5105decda4ecf7878f7b10346669f26e221&amp;scene=21#wechat_redirect" rel="nofollow noreferrer" target="_blank">SpringMVC【校验器、统一处理异常、RESTful、拦截器】</a></li>
                <li><a href="https://mp.weixin.qq.com/s?__biz=MzI4Njg5MDA5NA==&amp;mid=2247484031&amp;idx=2&amp;sn=c586cd21312c720a4a45435ea18dc30a&amp;chksm=ebd7437edca0ca68a8bdf98b962474b53e68372adc9e059964b55de60a0056aa204348f6206b&amp;scene=21#wechat_redirect" rel="nofollow noreferrer" target="_blank">SpringBoot就是这么简单</a></li>
                <li><a href="https://mp.weixin.qq.com/s?__biz=MzI4Njg5MDA5NA==&amp;mid=2247484031&amp;idx=3&amp;sn=c8b5a241b97cb502f93d2e216048fc8f&amp;chksm=ebd7437edca0ca68d882ce50836ec87cb9cb4f337760fac5f6bab2368692952049c59902c135&amp;scene=21#wechat_redirect" rel="nofollow noreferrer" target="_blank">SpringData JPA就是这么简单</a></li>
                <li><a href="https://mp.weixin.qq.com/s?__biz=MzI4Njg5MDA5NA==&amp;mid=2247484247&amp;idx=1&amp;sn=e228e29e344559e469ac3ecfa9715217&amp;chksm=ebd74256dca0cb40059f3f627fc9450f916c1e1b39ba741842d91774f5bb7f518063e5acf5a0&amp;scene=21#wechat_redirect" rel="nofollow noreferrer" target="_blank">Spring IOC知识点一网打尽！</a></li>
                <li><a href="https://mp.weixin.qq.com/s?__biz=MzI4Njg5MDA5NA==&amp;mid=2247484251&amp;idx=1&amp;sn=f792c5a1835af2c17f260be2055b5776&amp;chksm=ebd7425adca0cb4cc3a4e2ee61bdfa99508ea564e4ba4fd4ed54054b12fed76694b2b3afc26e&amp;scene=21#wechat_redirect" rel="nofollow noreferrer" target="_blank">Spring AOP就是这么简单啦</a></li>
                <li><a href="https://mp.weixin.qq.com/s?__biz=MzI4Njg5MDA5NA==&amp;mid=2247484335&amp;idx=1&amp;sn=a871bf871fcaffda0be40e1388a69d7d&amp;chksm=ebd742aedca0cbb8e22138fa7488cb80ee09a5b5d7aa065679904005c609e92a0d9ad755a913&amp;token=620000779&amp;lang=zh_CN&amp;scene=21#wechat_redirect" rel="nofollow noreferrer" target="_blank">外行人都能看懂的SpringCloud，错过了血亏！</a></li>
              </ul>
              <p>作为一名Java程序员，就不可能不了解SpringBoot，如果不了解(赶紧学！)</p>
              <h1 id="articleHeader1">一、SpringBoot的自动配置原理</h1>
              <p>不知道大家第一次搭SpringBoot环境的时候，有没有觉得非常简单。无须各种的配置文件，无须各种繁杂的pom坐标，一个main方法，就能run起来了。与其他框架整合也贼方便，使用<code>EnableXXXXX</code>注解就可以搞起来了！</p>
              <p>所以今天来讲讲SpringBoot是如何实现自动配置的~</p>
              <h2 id="articleHeader2">1.1三个重要的注解</h2>
              <p>我们可以发现，在使用<code>main()</code>启动SpringBoot的时候，只有一个注解<code>@SpringBootApplication</code></p>
              <p><span class="img-wrap"><img data-src="/img/remote/1460000018011538" src="/img/remote/1460000018011538" alt="只有一个@SpringBootApplication注解" title="只有一个@SpringBootApplication注解" style="cursor: pointer; display: inline;"></span></p>
              <p>我们可以点击进去<code>@SpringBootApplication</code>注解中看看，可以发现有<strong>三个注解</strong>是比较重要的：</p>
              <p><span class="img-wrap"><img data-src="/img/remote/1460000018011539?w=1292&amp;h=304" src="/img/remote/1460000018011539?w=1292&amp;h=304" alt="SpringBootApplication注解详情" title="SpringBootApplication注解详情" style="cursor: pointer; display: inline;"></span></p>
              <ul>
                <li>
                  <code>@SpringBootConfiguration</code>：我们点进去以后可以发现底层是<strong>Configuration</strong>注解，说白了就是支持<strong>JavaConfig</strong>的方式来进行配置(<strong>使用Configuration配置类等同于XML文件</strong>)。</li>
                <li>
                  <code>@EnableAutoConfiguration</code>：开启<strong>自动配置</strong>功能(后文详解)</li>
                <li>
                  <code>@ComponentScan</code>：这个注解，学过Spring的同学应该对它不会陌生，就是<strong>扫描</strong>注解，默认是扫描<strong>当前类下</strong>的package。将<code>@Controller/@Service/@Component/@Repository</code>等注解加载到IOC容器中。</li>
              </ul>
              <p>所以，<code>Java3yApplication</code>类可以被我们当做是这样的：</p>
              <div class="widget-codetool" style="display:none;">
                <div class="widget-codetool--inner">
                  <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
                  <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
@SpringBootConfiguration
@EnableAutoConfiguration
@ComponentScan
public class Java3yApplication {

    public static void main(String[] args) {
        SpringApplication.run(Java3yApplication.class, args);
    }
}" title="" data-original-title="复制"></span>
                </div>
              </div><pre class="java hljs"><code class="java">
<span class="hljs-meta">@SpringBootConfiguration</span>
<span class="hljs-meta">@EnableAutoConfiguration</span>
<span class="hljs-meta">@ComponentScan</span>
<span class="hljs-keyword">public</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Java3yApplication</span> </span>{

    <span class="hljs-function"><span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> <span class="hljs-keyword">void</span> <span class="hljs-title">main</span><span class="hljs-params">(String[] args)</span> </span>{
        SpringApplication.run(Java3yApplication.class, args);
    }
}</code></pre>
              <h3 id="articleHeader3">1.2重点EnableAutoConfiguration</h3>
              <p>我们知道SpringBoot可以帮我们减少很多的配置，也肯定听过“约定大于配置”这么一句话，那SpringBoot是怎么做的呢？其实靠的就是<code>@EnableAutoConfiguration</code>注解。</p>
              <p>简单来说，这个注解可以帮助我们<strong>自动载入</strong>应用程序所需要的所有<strong>默认配置</strong>。</p>
              <p>介绍有一句说：</p>
              <blockquote>if you have tomcat-embedded.jar on your classpath you are likely to want a TomcatServletWebServerFactory</blockquote>
              <p>如果你的类路径下有<code>tomcat-embedded.jar</code>包，那么你很可能就需要TomcatServletWebServerFactory</p>
              <p>我们点进去看一下，发现有<strong>两个</strong>比较重要的注解：</p>
              <p><span class="img-wrap"><img data-src="/img/remote/1460000018011540?w=862&amp;h=242" src="https://cdn.segmentfault.com/v-5c498373/global/img/squares.svg" alt="EnableAutoConfiguration注解详情" title="EnableAutoConfiguration注解详情" style="cursor: pointer;"></span></p>
              <ul>
                <li>
                  <code>@AutoConfigurationPackage</code>：自动配置包</li>
                <li>
                  <code>@Import</code>：给IOC容器导入组件</li>
              </ul>
              <h3 id="articleHeader4">1.2.1AutoConfigurationPackage</h3>
              <p>网上将这个<code>@AutoConfigurationPackage</code>注解解释成<strong>自动配置包</strong>，我们也看看<code>@AutoConfigurationPackage</code>里边有什么：</p>
              <p><span class="img-wrap"><img data-src="/img/remote/1460000018011541" src="https://cdn.segmentfault.com/v-5c498373/global/img/squares.svg" alt="AutoConfigurationPackage注解实现" title="AutoConfigurationPackage注解实现" style="cursor: pointer;"></span></p>
              <p>我们可以发现，依靠的还是<code>@Import</code>注解，再点进去查看，我们发现重要的就是以下的代码：</p>
              <div class="widget-codetool" style="display:none;">
                <div class="widget-codetool--inner">
                  <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
                  <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
@Override
public void registerBeanDefinitions(AnnotationMetadata metadata,
        BeanDefinitionRegistry registry) {
    register(registry, new PackageImport(metadata).getPackageName());
}
" title="" data-original-title="复制"></span>
                </div>
              </div><pre class="java hljs"><code class="java">
<span class="hljs-meta">@Override</span>
<span class="hljs-function"><span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> <span class="hljs-title">registerBeanDefinitions</span><span class="hljs-params">(AnnotationMetadata metadata,
        BeanDefinitionRegistry registry)</span> </span>{
    register(registry, <span class="hljs-keyword">new</span> PackageImport(metadata).getPackageName());
}
</code></pre>
              <p>在<strong>默认</strong>的情况下就是将：主配置类(<code>@SpringBootApplication</code>)的所在包及其子包里边的组件扫描到Spring容器中。</p>
              <ul><li>看完这句话，会不会觉得，这不就是ComponentScan的功能吗？这俩不就重复了吗？</li></ul>
              <p>我开始也有这个疑问，直到我看到文档的这句话：</p>
              <blockquote>it will be used when scanning for code @Entity classes.<br>It is generally recommended that you place EnableAutoConfiguration (if you're<br>not using  @SpringBootApplication) in a root package so that all sub-packages<br>and classes can be searched.</blockquote>
              <p>比如说，你用了Spring Data JPA，可能会在实体类上写<code>@Entity</code>注解。这个<code>@Entity</code>注解由<code>@AutoConfigurationPackage</code>扫描并加载，而我们平时开发用的<code>@Controller/@Service/@Component/@Repository</code>这些注解是由<code>ComponentScan</code>来扫描并加载的。</p>
              <ul><li>简单理解：这二者<strong>扫描的对象是不一样</strong>的。</li></ul>
              <h3 id="articleHeader5">1.2.2回到Import</h3>
              <p>我们回到<code>@Import(AutoConfigurationImportSelector.class)</code>这句代码上，再点进去<code>AutoConfigurationImportSelector.class</code>看看具体的实现是什么：</p>
              <p><span class="img-wrap"><img data-src="/img/remote/1460000018011542?w=1687&amp;h=652" src="https://cdn.segmentfault.com/v-5c498373/global/img/squares.svg" alt="得到很多配置信息" title="得到很多配置信息" style="cursor: pointer;"></span></p>
              <p>我们再进去看一下这些配置信息是从哪里来的(进去getCandidateConfigurations方法)：</p>
              <p><span class="img-wrap"><img data-src="/img/remote/1460000018011543?w=1542&amp;h=392" src="https://cdn.segmentfault.com/v-5c498373/global/img/squares.svg" alt="通过SpringFactoriesLoader来加载" title="通过SpringFactoriesLoader来加载" style="cursor: pointer;"></span></p>
              <p>这里包装了一层，我们看到的只是通过SpringFactoriesLoader来加载，还没看到关键信息，继续进去：</p>
              <p><span class="img-wrap"><img data-src="/img/remote/1460000018011544" src="https://cdn.segmentfault.com/v-5c498373/global/img/squares.svg" alt="跟踪实现" title="跟踪实现" style="cursor: pointer;"></span></p>
              <p>简单梳理：</p>
              <ul>
                <li>
                  <code>FACTORIES_RESOURCE_LOCATION</code>的值是<code>META-INF/spring.factories</code>
                </li>
                <li>Spring启动的时候会扫描所有jar路径下的<code>META-INF/spring.factories</code>，将其文件包装成Properties对象</li>
                <li>从Properties对象获取到key值为<code>EnableAutoConfiguration</code>的数据，然后添加到容器里边。</li>
              </ul>
              <p><span class="img-wrap"><img data-src="/img/remote/1460000018011545?w=1617&amp;h=639" src="https://cdn.segmentfault.com/v-5c498373/global/img/squares.svg" alt="从Properties对象获取到EnableAutoConfiguration.class对应的值，然后添加到容器里边" title="从Properties对象获取到EnableAutoConfiguration.class对应的值，然后添加到容器里边" style="cursor: pointer;"></span></p>
              <p>最后我们会默认加载113个默认的配置类：</p>
              <p><span class="img-wrap"><img data-src="/img/remote/1460000018011546" src="https://cdn.segmentfault.com/v-5c498373/global/img/squares.svg" alt="" title="" style="cursor: pointer;"></span></p>
              <p>有兴趣的同学可以去翻一下这些文件以及配置类哦：</p>
              <p><span class="img-wrap"><img data-src="/img/remote/1460000018011547?w=1911&amp;h=874" src="https://cdn.segmentfault.com/v-5c498373/global/img/squares.svg" alt="加载的配置类和文件的信息" title="加载的配置类和文件的信息" style="cursor: pointer;"></span></p>
              <h1 id="articleHeader6">1.3总结</h1>
              <p><code>@SpringBootApplication</code>等同于下面三个注解：</p>
              <ul>
                <li><code>@SpringBootConfiguration</code></li>
                <li><code>@EnableAutoConfiguration</code></li>
                <li><code>@ComponentScan</code></li>
              </ul>
              <p>其中<code>@EnableAutoConfiguration</code>是关键(启用自动配置)，内部实际上就去加载<code>META-INF/spring.factories</code>文件的信息，然后筛选出以<code>EnableAutoConfiguration</code>为key的数据，加载到IOC容器中，实现自动配置功能！</p>
              <p><span class="img-wrap"><img data-src="/img/remote/1460000018011548?w=1797&amp;h=561" src="https://cdn.segmentfault.com/v-5c498373/global/img/squares.svg" alt="自动配置功能" title="自动配置功能" style="cursor: pointer;"></span></p>
              <p>官网文档参考：</p>
              <ul><li><a href="https://docs.spring.io/spring-boot/docs/2.2.0.BUILD-SNAPSHOT/reference/html/using-spring-boot.html#using-boot-structuring-your-code" rel="nofollow noreferrer" target="_blank">https://docs.spring.io/spring-boot/docs/2.2.0.BUILD-SNAPSHOT/reference/html/using-spring-boot.html#using-boot-structuring-your-code</a></li></ul>
              <p>英语不好的同学可以像我一样，对照着来看：</p>
              <p><span class="img-wrap"><img data-src="/img/remote/1460000018011549?w=564&amp;h=212" src="https://cdn.segmentfault.com/v-5c498373/global/img/squares.svg" alt="一边插件，一边原文" title="一边插件，一边原文" style="cursor: pointer;"></span></p>
              <h1 id="articleHeader7">最后</h1>
              <blockquote>乐于输出<strong>干货</strong>的Java技术公众号：Java3y。公众号内有200多篇<strong>原创</strong>技术文章、海量视频资源、精美脑图，不妨来<strong>关注</strong>一下！</blockquote>
              <p><span class="img-wrap"><img data-src="/img/remote/1460000017755966?w=258&amp;h=258" src="https://cdn.segmentfault.com/v-5c498373/global/img/squares.svg" alt="帅的人都关注了" title="帅的人都关注了" style="cursor: pointer;"></span></p>
              <p>觉得我的文章写得不错，不妨点一下<strong>赞</strong>！</p>

            </div>
            <!-- 复制粘贴过来的，死样式，后面再删 end -->
          </div>
        </i-col>
      </Row>

    </div>
</template>

<script>
    import OkHeader from "../header/ok_header";
    export default {
        name: "articleInfo",
      components: {OkHeader},
      data() {
        return {
          push_time:"2019-01-21 17:04:39",
          article_id:this.$route.params.article_id,
        };
      },
      created(){
          console.log("文章ID:",this.article_id)
      }
    }
</script>

<style scoped>

  span{
    font-size: 16px;
  }

  a{
    text-decoration: none;
    color: black;
  }

  #articleInfo{
    padding: 0;
    margin: 0;
  }

  .row-title{
    padding-top: 30px;
    padding-bottom: 30px;
  }

  .row-userInfo{
  }

  .row-content{
    padding-top: 20px;
    padding-bottom: 20px;
  }

  .article_title{
    font-size: 25px;
    font-weight: bold;
  }
  .article_content{

  }

</style>
