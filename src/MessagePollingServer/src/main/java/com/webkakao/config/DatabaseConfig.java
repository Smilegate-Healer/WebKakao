package com.webkakao.config;

import javax.sql.DataSource;

import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;

@Configuration
public class DatabaseConfig {

    @Bean
    public SqlSessionFactory sqlSessionFatory(DataSource datasource) throws Exception{
     SqlSessionFactoryBean sqlSessionFactory = new SqlSessionFactoryBean();
     sqlSessionFactory.setDataSource(datasource);
     sqlSessionFactory.setMapperLocations(new PathMatchingResourcePatternResolver().getResources("classpath:/mappers/*.xml"));
     return (SqlSessionFactory) sqlSessionFactory.getObject();
    }    

    @Bean
    public SqlSessionTemplate sqlSession(SqlSessionFactory sqlSessionFactory) {
     return new SqlSessionTemplate(sqlSessionFactory);
    }
}