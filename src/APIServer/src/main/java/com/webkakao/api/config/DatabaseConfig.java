package com.webkakao.api.config;

import javax.sql.DataSource;

import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@EnableTransactionManagement
public class DatabaseConfig {
	
	private DataSource datasource;

    @Bean
    public SqlSessionFactory sqlSessionFatory(DataSource datasource) throws Exception{
     SqlSessionFactoryBean sqlSessionFactory = new SqlSessionFactoryBean();
     sqlSessionFactory.setDataSource(datasource);
     this.datasource = datasource;
     sqlSessionFactory.setMapperLocations(new PathMatchingResourcePatternResolver().getResources("classpath:/mappers/*.xml"));
     return (SqlSessionFactory) sqlSessionFactory.getObject();
    }    

    @Bean
    public SqlSessionTemplate sqlSession(SqlSessionFactory sqlSessionFactory) {
     return new SqlSessionTemplate(sqlSessionFactory);
    }
    
    @Bean
    public PlatformTransactionManager transactionManager(DataSource datasource) {
        DataSourceTransactionManager transactionManager = new DataSourceTransactionManager(datasource);
        return transactionManager;
    }
    
}